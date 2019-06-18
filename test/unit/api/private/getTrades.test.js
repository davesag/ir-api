const { expect } = require('chai')
const { match, stub } = require('sinon')
const proxyquire = require('proxyquire')
const { defaultParams } = require('../../../../src/defaults')

describe('api/private/getTrades', () => {
  const expected = 'some data'

  const post = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ post })
  }
  const payload = 'some payload'
  const buildPayload = stub().returns(payload)
  const payloadBuilder = stub().returns(buildPayload)

  const method = proxyquire('../../../../src/api/private/getTrades', {
    '../../utils/transport': transport,
    '../../utils/payloadBuilder': payloadBuilder
  })

  const apiKey = '1234'
  const apiSecret = '2468'

  const path = 'Private/GetTrades'

  const resetHistory = () => {
    transport.getTransport.resetHistory()
    payloadBuilder.resetHistory()
    buildPayload.resetHistory()
    post.resetHistory()
  }

  before(async () => {
    await method(apiKey, apiSecret)()
  })

  after(resetHistory)

  it('called buildPayload with the default params only', () => {
    expect(buildPayload).to.have.been.calledOnceWith(
      path,
      match({
        pageIndex: defaultParams.pageIndex,
        pageSize: defaultParams.pageSize
      })
    )
  })
})
