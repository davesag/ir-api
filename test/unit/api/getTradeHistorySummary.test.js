const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/getTradeHistorySummary', () => {
  const expected = {
    CreatedTimestampUtc: '2014-08-05T09:02:57.5440691Z',
    HistorySummaryItems: [
      {
        AverageSecondaryCurrencyPrice: 510.0,
        ClosingSecondaryCurrencyPrice: 510.0,
        StartTimestampUtc: '2014-08-04T09:00:00Z',
        EndTimestampUtc: '2014-08-04T10:00:00Z',
        HighestSecondaryCurrencyPrice: 510.0,
        LowestSecondaryCurrencyPrice: 510.0,
        NumberOfTrades: 0,
        OpeningSecondaryCurrencyPrice: 510.0,
        PrimaryCurrencyVolume: 0.0,
        SecondaryCurrencyVolume: 0.0
      }
    ],
    NumberOfHoursInThePastToRetrieve: 1,
    PrimaryCurrencyCode: 'Xbt',
    SecondaryCurrencyCode: 'Usd'
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
