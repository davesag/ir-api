const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/getMarketSummary', () => {
  const expected = {
    'CreatedTimestampUtc ': '2014-08-05T06:42:11.3032208Z',
    CurrentHighestBidPrice: 500.0,
    CurrentLowestOfferPrice: 1001.0,
    DayAvgPrice: 510.0,
    DayHighestPrice: 510.0,
    DayLowestPrice: 510.0,
    DayVolumeXbt: 1.0,
    DayVolumeXbtInSecondaryCurrrency: 0.75,
    LastPrice: 510.0,
    PrimaryCurrencyCode: 'Xbt',
    SecondaryCurrencyCode: 'Usd'
  }

  const get = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ get })
  }

  const method = proxyquire('../../../src/api/getMarketSummary', {
    '../utils/transport': transport
  })

  const resetHistory = () => {
    transport.getTransport.resetHistory()
    get.resetHistory()
  }

  const params = {
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Usd'
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
      'Public/GetMarketSummary?primaryCurrencyCode=Xbt&secondaryCurrencyCode=Usd'
    )
  })

  it('returned the expected result', () => {
    expect(result).to.deep.equal(expected)
  })
})
