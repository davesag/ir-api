const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const validate = require('../../validation')

const { post } = getTransport()

const validation = {
  amount: ['isRequired'],
  withdrawalAddress: ['isRequired'],
  comment: ['isRequired']
}

const withdrawDigitalCurrency = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({
    amount,
    withdrawalAddress,
    comment,
    primaryCurrencyCode,
    destinationTag
  }) => {
    const payload = {
      amount,
      withdrawalAddress,
      comment,
      primaryCurrencyCode,
      destinationTag
    }
    validate(payload, validation)
    const path = 'Private/WithdrawDigitalCurrency'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = withdrawDigitalCurrency
