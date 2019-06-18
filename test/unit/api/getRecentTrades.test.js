const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/getRecentTrades', () => {
  const expected = {
    CreatedTimestampUtc: '2014-08-05T09:14:39.4830696Z',
    PrimaryCurrencyCode: 'Xbt',
    SecondaryCurrencyCode: 'Usd',
    Trades: [
      {
        PrimaryCurrencyAmount: 1.0,
        SecondaryCurrencyTradePrice: 510.0,
        TradeTimestampUtc: '2014-07-31T10:34:05.935412Z'
      },
      {
        PrimaryCurrencyAmount: 0.01,
        SecondaryCurrencyTradePrice: 501.0,
        TradeTimestampUtc: '2014-07-31T10:33:24.8458426Z'
      }
    ]
  }

  const get = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ get })
  }

  const method = proxyquire('../../../src/api/getRecentTrades', {
    '../utils/transport': transport
  })

  const resetHistory = () => {
    transport.getTransport.resetHistory()
    get.resetHistory()
  }

  const params = {
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Usd',
    numberOfRecentTradesToRetrieve: 25
  }

  let result

  before(async () => {
    result = await method(params)
  })

  after(resetHistory)

  it('called getTransport', () => {
    expect(transport.getTransport).to.have.been.calledOnce
  })

  it('called get with the correct params', () => {
    expect(get).to.have.been.calledOnceWith(
      'Public/GetRecentTrades?primaryCurrencyCode=Xbt&secondaryCurrencyCode=Usd&numberOfRecentTradesToRetrieve=25'
    )
  })

  it('returned the expected result', () => {
    expect(result).to.deep.equal(expected)
  })
})
