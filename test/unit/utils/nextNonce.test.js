const { expect } = require('chai')

const nextNonce = require('../../../src/utils/nextNonce')

describe('utils/nextNonce', () => {
  describe('in sequence', () => {
    const nonce1 = nextNonce()
    const nonce2 = nextNonce()

    it('incremented the nonces', () => {
      expect(nonce1).to.equal(nonce2 - 1)
    })
  })

  describe('five nonces in parallel', () => {
    let nonces

    before(async () => {
      nonces = await Promise.all([nextNonce(), nextNonce(), nextNonce(), nextNonce(), nextNonce()])
    })

    it('incremented the nonces', () => {
      expect(nonces[0]).to.be.lessThan(nonces[1])
      expect(nonces[1]).to.be.lessThan(nonces[2])
      expect(nonces[2]).to.be.lessThan(nonces[3])
      expect(nonces[3]).to.be.lessThan(nonces[4])
    })
  })
})
