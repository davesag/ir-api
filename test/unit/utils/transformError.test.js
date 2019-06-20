const { expect } = require('chai')

const transformError = require('../../../src/utils/transformError')
const RequestError = require('../../../src/errors/RequestError')
const ResponseError = require('../../../src/errors/ResponseError')

describe('utils/transformError', () => {
  const message = 'a message'
  const data = { Message: 'oops' }
  const status = 404
  const config = { url: 'some-url' }
  const response = { status, data }
  const request = { something: 'whatever' }

  let error

  context('error has a config', () => {
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
