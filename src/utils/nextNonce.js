// eslint-disable-next-line fp/no-let
let nonce = Date.now()

// eslint-disable-next-line fp/no-mutation
const nextNonce = () => nonce++

module.exports = nextNonce
