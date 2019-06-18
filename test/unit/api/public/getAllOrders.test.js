const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/public/getAllOrders', () => {
  const expected = {
    buyOrders: [
      {
        guid: '78c52285-61de-4ccb-914e-d86db9fb498d',
        price: 497.02,
        volume: 0.01
      },
      {
        guid: 'b0ae2cde-cefb-451d-8c65-92082e062856',
        price: 490.0,
        volume: 1.0
      }
    ],
    SellOrders: [
      {
        guid: '9a32ae71-391e-4a21-8817-603472d75342',
        price: 500.0,
        volume: 1.0
      },
      {
        guid: '8ee0209f-fd46-4d90-9eed-ab475485e157',
        price: 505.0,
        volume: 1.0
      }
    ],
    createdTimestampUtc: '2014-08-05T06:42:11.3032208Z',
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Usd'
  }

  const get = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ get })
  }

  const method = proxyquire('../../../../src/api/public/getAllOrders', {
    '../../utils/transport': transport
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
