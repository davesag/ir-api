const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/public/getRecentTrades', () => {
  const expected = {
    createdTimestampUtc: '2014-08-05T09:14:39.4830696Z',
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Usd',
    trades: [
      {
        primaryCurrencyAmount: 1.0,
        secondaryCurrencyTradePrice: 510.0,
        tradeTimestampUtc: '2014-07-31T10:34:05.935412Z'
      },
      {
        primaryCurrencyAmount: 0.01,
        secondaryCurrencyTradePrice: 501.0,
        tradeTimestampUtc: '2014-07-31T10:33:24.8458426Z'
      }
    ]
  }

  const get = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ get })
  }

  const method = proxyquire('../../../../src/api/public/getRecentTrades', {
    '../../utils/transport': transport
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
