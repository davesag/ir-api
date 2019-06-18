const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')

const { post } = getTransport()

const withdrawDigitalCurrency = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async (params = {}) => {
    const payload = {
      amount: params.amount,
      withdrawalAddress: params.withdrawalAddress,
      comment: params.comment,
      primaryCurrencyCode: params.primaryCurrencyCode,
      destinationTag: params.destinationTag
    }
    const path = 'Private/WithdrawDigitalCurrency'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = withdrawDigitalCurrency
