const { expect } = require('chai')
const { match, stub } = require('sinon')
const proxyquire = require('proxyquire')

const RequestError = require('../../../src/errors/RequestError')
const ResponseError = require('../../../src/errors/ResponseError')

describe('utils/transformError', () => {
  const retry = stub()
  const getTransport = stub().returns({ retry })

  const transformError = proxyquire('../../../src/utils/transformError', {
    './transport': { getTransport }
  })

  const message = 'a message'
  const data = { Message: 'oops' }
  const status = 404
  const response = { status, data }
  const request = { something: 'whatever' }

  const resetStubs = () => {
    retry.resetHistory()
    getTransport.resetHistory()
  }

  let error

  context('error has a config', () => {
    context('error can be retried', () => {
      const code = 'ECONNABORTED'

      context('error has not been retried before', () => {
        const config = {
          method: 'get',
          url: 'some/GetMethod',
          timeout: 2500
        }

        before(async () => {
          retry.resolves()
          await transformError({ code, message, config, response })
        })

        after(resetStubs)

        it('called retry with a modified config', () => {
          expect(retry).to.have.been.calledOnceWith(
            match({
              ...config,
              _retryCount: 1,
              timeout: 2750
            })
          )
        })
      })

      context('error has been retried before', () => {
        context('once', () => {
          const config = {
            method: 'get',
            url: 'some/GetMethod',
            _retryCount: 1,
            timeout: 2750
          }

          before(async () => {
            retry.resolves()
            await transformError({ code, message, config, response })
          })

          after(resetStubs)

          it('called retry with a modified config', () => {
            expect(retry).to.have.been.calledOnceWith(
              match({
                ...config,
                _retryCount: 2,
                timeout: 3250
              })
            )
          })
        })

        context('MAX_RETRIES', () => {
          const config = {
            method: 'get',
            url: 'some/GetMethod',
            _retryCount: 3
          }

          before(() => {
            try {
              transformError({ code, message, config, response })
            } catch (err) {
              error = err
            }
          })

          after(resetStubs)

          it('did not call retry', () => {
            expect(retry).not.to.have.been.called
          })
        })
      })
    })

    context('error can not be retried', () => {
      const config = { method: 'get', url: 'some-url' }

      context('error has a response', () => {
        before(() => {
          try {
            transformError({ message, config, response })
          } catch (err) {
            error = err
          }
        })

        it('threw a ResponseError', () => {
          expect(error).to.be.instanceof(ResponseError)
        })

        it('has the correct message', () => {
          expect(error).to.have.property('message', data.Message)
        })

        it('has the correct status', () => {
          expect(error).to.have.property('status', status)
        })

        it('has the correct details', () => {
          expect(error).to.have.nested.property('details.url', config.url)
        })
      })

      context('error has a request', () => {
        before(() => {
          try {
            transformError({ message, config, response })
          } catch (err) {
            error = err
          }
        })

        it('threw a RequestError', () => {
          expect(error).to.be.instanceof(RequestError)
        })

        it('has the correct message', () => {
          expect(error).to.have.property('message', data.Message)
        })

        it('has the correct details', () => {
          expect(error).to.have.nested.property('details.url', config.url)
        })
      })
    })

    context('error has no config', () => {
      context('error has a response', () => {
        it('throws a ResponseError', () =>
          expect(() =>
            transformError({
              message,
              response: {
                status,
                data
              }
            })
          )
            .to.throw(ResponseError, data.Message)
            .with.property('status', status))
      })

      context('error has a request', () => {
        it('throws a RequestError', () =>
          expect(() => transformError({ message, request })).to.throw(
            RequestError,
            message
          ))
      })
    })

    context('just an error', () => {
      it('throws a RequestError', () =>
        expect(() => transformError({ message })).to.throw(Error, message))
    })
  })
})
