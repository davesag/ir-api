const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/private/getAccounts', () => {
  const expected = 'some data'

  const post = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ post })
  }
  const payload = 'some payload'
  const buildPayload = stub().returns(payload)
  const payloadBuilder = stub().returns(buildPayload)

  const method = proxyquire('../../../../src/api/private/getAccounts', {
    '../../utils/transport': transport,
    '../../utils/payloadBuilder': payloadBuilder
  })

  const apiKey = '1234'
  const apiSecret = '2468'
  const path = 'Private/GetAccounts'

  const resetHistory = () => {
    transport.getTransport.resetHistory()
    payloadBuilder.resetHistory()
    buildPayload.resetHistory()
    post.resetHistory()
  }

  let result

  before(async () => {
    result = await method(apiKey, apiSecret)()
  })

  after(resetHistory)

  it('called getTransport', () => {
    expect(transport.getTransport).to.have.been.calledOnce
  })

  it('called payloadBuilder with the apiKey and apiSecret', () => {
    expect(payloadBuilder).to.have.been.calledOnceWith(apiKey, apiSecret)
  })

  it('called buildPayload with the path', () => {
    expect(buildPayload).to.have.been.calledOnceWith(path)
  })

  it('called post with the correct params', () => {
    expect(post).to.have.been.calledOnceWith(path, payload)
  })

  it('returned the expected result', () => {
    expect(result).to.deep.equal(expected)
  })
})
