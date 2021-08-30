const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  depositAddress: ['isRequired'],
  primaryCurrencyCode: ['isRequired']
}

// https://www.independentreserve.com/products/api#SynchDigitalCurrencyDepositAddressWithBlockchain
const synchDigitalCurrencyDepositAddressWithBlockchain = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ depositAddress, primaryCurrencyCode }) => {
    const payload = { depositAddress, primaryCurrencyCode }
    // eslint-disable-next-line fp/no-unused-expression
    validateFields(payload, validation)
    const path = 'Private/SynchDigitalCurrencyDepositAddressWithBlockchain'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = synchDigitalCurrencyDepositAddressWithBlockchain
