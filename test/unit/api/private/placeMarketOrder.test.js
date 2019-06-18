const { expect } = require('chai')
const { match, stub } = require('sinon')
const proxyquire = require('proxyquire')
const { defaultParams } = require('../../../../src/defaults')

describe('api/private/placeMarketOrder', () => {
  const expected = 'some data'

  const post = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ post })
  }
  const payload = 'some payload'
  const buildPayload = stub().returns(payload)
  const payloadBuilder = stub().returns(buildPayload)

  const method = proxyquire('../../../../src/api/private/placeMarketOrder', {
    '../../utils/transport': transport,
    '../../utils/payloadBuilder': payloadBuilder
  })

  const apiKey = '1234'
  const apiSecret = '2468'
  const params = {
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Aud',
    orderType: 'MarketBit',
    volume: 0.25
  }

  const path = 'Private/PlaceMarketOrder'

  const resetHistory = () => {
    transport.getTransport.resetHistory()
    payloadBuilder.resetHistory()
    buildPayload.resetHistory()
    post.resetHistory()
  }

  let result

  context('with supplied params', () => {
    before(async () => {
      result = await method(apiKey, apiSecret)(params)
    })

    after(resetHistory)

    it('called getTransport', () => {
      expect(transport.getTransport).to.have.been.calledOnce
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

  context('without supplied params', () => {
    before(async () => {
      result = await method(apiKey, apiSecret)()
    })

    after(resetHistory)

    it('called buildPayload with path and no params', () => {
      expect(buildPayload).to.have.been.calledOnceWith(path, match({}))
    })
  })
})
