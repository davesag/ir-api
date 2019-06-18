const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/getValidTransactionTypes', () => {
  const expected = [
    'AccountFee',
    'Brokerage',
    'Deposit',
    'DepositFee',
    'GST',
    'ReferralCommission',
    'StatementFee',
    'Trade',
    'Withdrawal',
    'WithdrawalFee'
  ]
  const get = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ get })
  }

  const method = proxyquire('../../../src/api/getValidTransactionTypes', {
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
    expect(get).to.have.been.calledOnceWith('Public/GetValidTransactionTypes')
  })

  it('returned the expected result', () => {
    expect(result).to.deep.equal(expected)
  })
})
