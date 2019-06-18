const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('src/index', () => {
  const getOpenOrders = stub().returns('getOpenOrders')

  const ir = proxyquire('../../src/', {
    './api/getOpenOrders': getOpenOrders
  })

  const resetHistory = () => {
    getOpenOrders.resetHistory()
  }

  const testOnlyPublicMethods = () => {
    it('did not invoke getOpenOrders', () => {
      expect(getOpenOrders).not.to.have.been.called
    })

    it('returned the public methods', () => {
      ;[
        'getFxRates',
        'getMarketSummary',
        'getValidLimitOrderTypes',
        'getValidMarketOrderTypes',
        'getValidOrderTypes',
        'getValidPrimaryCurrencyCodes',
        'getValidSecondaryCurrencyCodes',
        'getValidTransactionTypes'
      ].forEach(method => {
        expect(api).to.have.property(method)
      })
    })

    it('did not return the private methods', () => {
      ;['getOpenOrders'].forEach(method => {
        expect(api).not.to.have.property(method)
      })
    })
  }

  let api

  it('returns a function', () => {
    expect(ir).to.be.a('function')
  })

  context('given key', () => {
    const key = '12345'

    context('given secret', () => {
      const secret = '246810'

      before(() => {
        api = ir(key, secret)
      })

      after(resetHistory)

      it('invoked getOpenOrders with the key and secret', () => {
        expect(getOpenOrders).to.have.been.calledOnceWith(key, secret)
      })

      it('returned both the public and private methods', () => {
        ;['getValidPrimaryCurrencyCodes', 'getOpenOrders'].forEach(method => {
          expect(api).to.have.property(method)
        })
      })
    })

    context('not given secret', () => {
      before(() => {
        api = ir(key)
      })

      after(resetHistory)

      testOnlyPublicMethods()
    })
  })

  context('not given a key', () => {
    before(() => {
      api = ir()
    })

    after(resetHistory)

    testOnlyPublicMethods()
  })
})
