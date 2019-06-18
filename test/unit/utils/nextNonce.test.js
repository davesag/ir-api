const { expect } = require('chai')

const nextNonce = require('../../../src/utils/nextNonce')

describe('utils/nextNonce', () => {
  const nonce1 = nextNonce()
  const nonce2 = nextNonce()

  it('incremented the nonces', () => {
    expect(nonce1).to.equal(nonce2 - 1)
  })
})
