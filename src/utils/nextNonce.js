let nonce = new Date().getTime()

const nextNonce = () => nonce++

module.exports = nextNonce
