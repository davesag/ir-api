const { expect } = require('chai')
const { match, stub } = require('sinon')
const proxyquire = require('proxyquire')
const { encode } = require('querystring')
const uc = require('./uc')

const doTest = ({ handler, params, validation }) => {
  describe(`api/public/${handler}`, () => {
    const expected = 'some data'
    const get = stub().resolves(expected)
    const transport = { getTransport: stub().returns({ get }) }
    const validate = stub()

    const proxies = {
      '../../utils/transport': transport
    }
    if (validation) proxies['../../validation'] = validate

    const method = proxyquire(`../../src/api/public/${handler}`, proxies)

    const resetHistory = () => {
      transport.getTransport.resetHistory()
      validate.resetHistory()
      get.resetHistory()
    }
    const path = params
      ? `Public/${uc(handler)}?${encode(params)}`
      : `Public/${uc(handler)}`

    let result

    before(async () => {
      result = await method(params)
    })

    after(resetHistory)

    it('called getTransport', () => {
      expect(transport.getTransport).to.have.been.calledOnce
    })

    if (validation) {
      it('called validate with the complete set of params and the validation rules', () => {
        expect(validate).to.have.been.calledOnceWith(match(params), validation)
      })
    }

    it('called get with the correct path', () => {
      expect(get).to.have.been.calledOnceWith(path)
    })

    it('returned the expected result', () => {
      expect(result).to.deep.equal(expected)
    })
  })
}

module.exports = doTest
