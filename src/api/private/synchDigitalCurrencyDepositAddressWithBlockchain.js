const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

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
    validateFields(payload, validation)
    const path = 'Private/SynchDigitalCurrencyDepositAddressWithBlockchain'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = synchDigitalCurrencyDepositAddressWithBlockchain
