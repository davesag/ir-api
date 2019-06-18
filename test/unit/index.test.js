const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

const privateFns = require('../../src/api/private')

describe('src/index', () => {
  const privateStubs = Object.keys(privateFns).reduce((acc, elem) => {
    acc[elem] = stub().returns(elem)
    return acc
  }, {})
  const privateMethods = Object.keys(privateStubs)
  const publicMethods = [
    'getAllOrders',
    'getFxRates',
    'getMarketSummary',
    'getOrderBook',
    'getRecentTrades',
    'getTradeHistorySummary',
    'getValidLimitOrderTypes',
    'getValidMarketOrderTypes',
    'getValidOrderTypes',
    'getValidPrimaryCurrencyCodes',
    'getValidSecondaryCurrencyCodes',
    'getValidTransactionTypes'
  ]

  const ir = proxyquire('../../src/', { './api/private': privateStubs })

  const resetHistory = () => {
    privateMethods.forEach(method => {
      privateStubs[method].resetHistory()
    })
  }

  const testOnlyPublicMethods = () => {
    Object.keys(privateFns).forEach(method => {
      it(`did not invoke ${method}`, () => {
        expect(privateStubs[method]).not.to.have.been.called
      })
    })

    it('returned the public methods', () => {
      publicMethods.forEach(method => {
        expect(api).to.have.property(method)
      })
    })

    it('did not return the private methods', () => {
      Object.keys(privateFns).forEach(method => {
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

      Object.keys(privateStubs).forEach(pstub => {
        it(`invoked ${pstub} with the key and secret`, () => {
          expect(privateStubs[pstub]).to.have.been.calledOnceWith(key, secret)
        })
      })

      it('returned both the public and private methods', () => {
        ;[...publicMethods, ...privateMethods].forEach(method => {
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
