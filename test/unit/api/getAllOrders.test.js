const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/getAllOrders', () => {
  const expected = {
    BuyOrders: [
      {
        Guid: '78c52285-61de-4ccb-914e-d86db9fb498d',
        Price: 497.02,
        Volume: 0.01
      },
      {
        Guid: 'b0ae2cde-cefb-451d-8c65-92082e062856',
        Price: 490.0,
        Volume: 1.0
      }
    ],
    SellOrders: [
      {
        Guid: '9a32ae71-391e-4a21-8817-603472d75342',
        Price: 500.0,
        Volume: 1.0
      },
      {
        Guid: '8ee0209f-fd46-4d90-9eed-ab475485e157',
        Price: 505.0,
        Volume: 1.0
      }
    ],
    CreatedTimestampUtc: '2014-08-05T06:42:11.3032208Z',
    PrimaryCurrencyCode: 'Xbt',
    SecondaryCurrencyCode: 'Usd'
  }

  const get = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ get })
  }

  const method = proxyquire('../../../src/api/getAllOrders', {
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
      'Public/GetAllOrders?primaryCurrencyCode=Xbt&secondaryCurrencyCode=Usd'
    )
  })

  it('returned the expected result', () => {
    expect(result).to.deep.equal(expected)
  })
})
