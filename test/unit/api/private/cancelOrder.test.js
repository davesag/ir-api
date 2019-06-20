const { expect } = require('chai')
const { match, stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/private/cancelOrder', () => {
  const expected = 'some data'

  const post = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ post })
  }
  const payload = 'some payload'
  const buildPayload = stub().returns(payload)
  const payloadBuilder = stub().returns(buildPayload)
  const validate = stub()

  const method = proxyquire('../../../../src/api/private/cancelOrder', {
    '../../utils/transport': transport,
    '../../utils/payloadBuilder': payloadBuilder,
    '../../validation': validate
  })

  const apiKey = '1234'
  const apiSecret = '2468'
  const params = { orderGuid: 'abcd123' }

  const path = 'Private/CancelOrder'
  const validation = {
    orderGuid: ['isRequired']
  }

  const resetHistory = () => {
    transport.getTransport.resetHistory()
    payloadBuilder.resetHistory()
    buildPayload.resetHistory()
    validate.resetHistory()
    post.resetHistory()
  }

  let result

  before(async () => {
    result = await method(apiKey, apiSecret)(params)
  })

  after(resetHistory)

  it('called getTransport', () => {
    expect(transport.getTransport).to.have.been.calledOnce
  })

  it('called validate with the params and validation rules', () => {
    expect(validate).to.have.been.calledOnceWith(params, validation)
  })

  it('called payloadBuilder with the apiKey and apiSecret', () => {
    expect(payloadBuilder).to.have.been.calledOnceWith(apiKey, apiSecret)
  })

  it('called buildPayload with the params', () => {
    expect(buildPayload).to.have.been.calledOnceWith(path, match(params))
  })

  it('called post with the correct params', () => {
    expect(post).to.have.been.calledOnceWith(path, payload)
  })

  it('returned the expected result', () => {
    expect(result).to.deep.equal(expected)
  })
})
