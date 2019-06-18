const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')
const { createHmac } = require('crypto')
const {
  transportOptions: { baseURL }
} = require('../../../src/defaults')

describe('utils/payloadBuilder', () => {
  const nonce = 1
  const nextNonce = stub().returns(nonce)

  const payloadBuilder = proxyquire('../../../src/utils/payloadBuilder', {
    './nextNonce': nextNonce
  })

  const apiKey = 'abcd123'
  const apiSecret = '2468whodoweappreciate'
  const path = 'Test'

  const signer = createHmac('sha256', Buffer.from(apiSecret, 'utf8'))
  const message = [
    `${baseURL}/${path}`,
    `apiKey=${apiKey}`,
    `nonce=${nonce}`,
    'test=data'
  ].join(',')

  const signature = signer
    .update(message)
    .digest('hex')
    .toUpperCase()

  const payload = {
    test: 'data'
  }

  const expected = {
    apiKey,
    nonce,
    signature,
    ...payload
  }

  const buildPayload = payloadBuilder(apiKey, apiSecret)

  it('returns the expected result', () => {
    expect(buildPayload(path, payload)).to.deep.equal(expected)
  })
})
