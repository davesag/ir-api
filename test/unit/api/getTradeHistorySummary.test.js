const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/getTradeHistorySummary', () => {
  const expected = {
    createdTimestampUtc: '2014-08-05T09:02:57.5440691Z',
    historySummaryItems: [
      {
        averageSecondaryCurrencyPrice: 510.0,
        closingSecondaryCurrencyPrice: 510.0,
        startTimestampUtc: '2014-08-04T09:00:00Z',
        endTimestampUtc: '2014-08-04T10:00:00Z',
        highestSecondaryCurrencyPrice: 510.0,
        lowestSecondaryCurrencyPrice: 510.0,
        numberOfTrades: 0,
        openingSecondaryCurrencyPrice: 510.0,
        primaryCurrencyVolume: 0.0,
        secondaryCurrencyVolume: 0.0
      }
    ],
    numberOfHoursInThePastToRetrieve: 1,
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Usd'
  }

  const get = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ get })
  }

  const method = proxyquire('../../../src/api/getTradeHistorySummary', {
    '../utils/transport': transport
  })

  const resetHistory = () => {
    transport.getTransport.resetHistory()
    get.resetHistory()
  }

  const params = {
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Usd',
    numberOfHoursInThePastToRetrieve: 24
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
      'Public/GetTradeHistorySummary?primaryCurrencyCode=Xbt&secondaryCurrencyCode=Usd&numberOfHoursInThePastToRetrieve=24'
    )
  })

  it('returned the expected result', () => {
    expect(result).to.deep.equal(expected)
  })
})
