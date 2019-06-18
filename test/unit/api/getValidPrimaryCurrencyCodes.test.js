const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/getValidPrimaryCurrencyCodes', () => {
  const expected = [
    'Xbt',
    'Xrp',
    'Eth',
    'Eos',
    'Bch',
    'Ltc',
    'Xlm',
    'Bat',
    'Omg',
    'Rep',
    'Zrx',
    'Gnt',
    'Pla'
  ]
  const get = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ get })
  }

  const method = proxyquire('../../../src/api/getValidPrimaryCurrencyCodes', {
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
    expect(get).to.have.been.calledOnceWith(
      'Public/GetValidPrimaryCurrencyCodes'
    )
  })

  it('returned the expected result', () => {
    expect(result).to.deep.equal(expected)
  })
})
