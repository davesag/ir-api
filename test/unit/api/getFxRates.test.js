const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/getFxRates', () => {
  const expected = [
    { currencyCodeA: 'Aud', currencyCodeB: 'Usd', Rate: 0.8683 },
    { currencyCodeA: 'Usd', currencyCodeB: 'Aud', Rate: 1.1517 }
  ]

  const get = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ get })
  }

  const method = proxyquire('../../../src/api/getFxRates', {
    '../utils/transport': transport
  })

  const resetHistory = () => {
    transport.getTransport.resetHistory()
    get.resetHistory()
  }

  let result

  before(async () => {
    result = await method()
  })

  after(resetHistory)

  it('called getTransport', () => {
    expect(transport.getTransport).to.have.been.calledOnce
  })

  it('called get with the correct params', () => {
    expect(get).to.have.been.calledOnceWith('Public/GetFxRates')
  })

  it('returned the expected result', () => {
    expect(result).to.deep.equal(expected)
  })
})
