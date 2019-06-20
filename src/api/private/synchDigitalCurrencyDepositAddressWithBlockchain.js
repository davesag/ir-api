const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const validate = require('../../validation')

const { post } = getTransport()

const validation = {
  depositAddress: ['isRequired'],
  primaryCurrencyCode: ['isRequired']
}

const synchDigitalCurrencyDepositAddressWithBlockchain = (
  apiKey,
  apiSecret
) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ depositAddress, primaryCurrencyCode }) => {
    const payload = { depositAddress, primaryCurrencyCode }
    validate(payload, validation)
    const path = 'Private/SynchDigitalCurrencyDepositAddressWithBlockchain'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = synchDigitalCurrencyDepositAddressWithBlockchain
