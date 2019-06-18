const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')

const { post } = getTransport()

const synchDigitalCurrencyDepositAddressWithBlockchain = (
  apiKey,
  apiSecret
) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async (params = {}) => {
    const payload = {
      depositAddress: params.depositAddress,
      primaryCurrencyCode: params.primaryCurrencyCode
    }
    const path = 'Private/SynchDigitalCurrencyDepositAddressWithBlockchain'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = synchDigitalCurrencyDepositAddressWithBlockchain
