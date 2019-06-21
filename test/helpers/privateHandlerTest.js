const { expect } = require('chai')
const { match, stub } = require('sinon')
const proxyquire = require('proxyquire')
const uc = require('./uc')

const { defaultParams } = require('../../src/defaults')

const skipEmptyTest = (params, validation, useDefaults) => {
  if (params) {
    if (
      validation &&
      Object.keys(params).find(
        param => validation[param] && validation[param].includes('isRequired')
      ) !== null
    )
      return [true]

    if (!validation) {
      return useDefaults ? [false, {}] : [true]
    }
  }
  return useDefaults ? [false, {}] : [false]
}

const validationMatcher = validation =>
  match(
    Object.keys(validation).reduce((acc, elem) => {
      acc[elem] = []
      validation[elem].forEach(val => {
        const vmatch = typeof val === 'function' ? match.func : val
        acc[elem].push(vmatch)
      })
      return acc
    }, {})
  )

const doTest = ({ handler, params, useDefaults, validation }) => {
  const [skipEmpty, useAsEmpty] = skipEmptyTest(params, validation, useDefaults)

  describe(`api/private/${handler}`, () => {
    const expected = 'some data'
    const post = stub().resolves(expected)
    const transport = { getTransport: stub().returns({ post }) }
    const payload = 'some payload'
    const buildPayload = stub().returns(payload)
    const payloadBuilder = stub().returns(buildPayload)
    const validateFields = stub()

    const proxies = {
      '../../utils/transport': transport,
      '../../utils/payloadBuilder': payloadBuilder
    }
    if (validation) proxies['../../validation'] = { validateFields }

    const method = proxyquire(`../../src/api/private/${handler}`, proxies)

    const resetHistory = () => {
      transport.getTransport.resetHistory()
      payloadBuilder.resetHistory()
      buildPayload.resetHistory()
      validateFields.resetHistory()
      post.resetHistory()
    }

    const apiKey = '1234'
    const apiSecret = '2468'
    const path = `Private/${uc(handler)}`
    const fullParams = params
      ? useDefaults
        ? {
            ...params,
            ...defaultParams
          }
        : params
      : useDefaults
      ? defaultParams
      : undefined

    let result

    if (params) {
      context('with supplied params', () => {
        before(async () => {
          result = await method(apiKey, apiSecret)(params)
        })

        after(resetHistory)

        it('called getTransport', () => {
          expect(transport.getTransport).to.have.been.calledOnce
        })

        if (validation) {
          it('called validateFields with the complete set of params and the validation rules', () => {
            expect(validateFields).to.have.been.calledOnceWith(
              match(fullParams),
              validationMatcher(validation)
            )
          })
        }

        it('called payloadBuilder with the apiKey and apiSecret', () => {
          expect(payloadBuilder).to.have.been.calledOnceWith(apiKey, apiSecret)
        })

        if (fullParams) {
          it('called buildPayload with the path and params', () => {
            expect(buildPayload).to.have.been.calledOnceWith(
              path,
              match(fullParams)
            )
          })
        } else {
          it('called buildPayload with just the path', () => {
            expect(buildPayload).to.have.been.calledOnceWith(path)
          })
        }

        it('called post with the correct params', () => {
          expect(post).to.have.been.calledOnceWith(path, payload)
        })

        it('returned the expected result', () => {
          expect(result).to.deep.equal(expected)
        })
      })
    }

    if (!skipEmpty) {
      context('without supplied params', () => {
        before(async () => {
          result = await method(apiKey, apiSecret)(useAsEmpty)
        })

        after(resetHistory)

        if (validation) {
          it('called validateFields with the complete set of params and the validation rules', () => {
            expect(validateFields).to.have.been.calledOnceWith(
              match(fullParams),
              validationMatcher(validation)
            )
          })
        }

        it('called payloadBuilder with the apiKey and apiSecret', () => {
          expect(payloadBuilder).to.have.been.calledOnceWith(apiKey, apiSecret)
        })

        if (fullParams) {
          it('called buildPayload with the path and default params', () => {
            expect(buildPayload).to.have.been.calledOnceWith(
              path,
              match(defaultParams)
            )
          })
        } else {
          it('called buildPayload with the path only', () => {
            expect(buildPayload).to.have.been.calledOnceWith(path)
          })
        }

        it('called post with the correct params', () => {
          expect(post).to.have.been.calledOnceWith(path, payload)
        })

        it('returned the expected result', () => {
          expect(result).to.deep.equal(expected)
        })
      })
    }
  })
}

module.exports = doTest
