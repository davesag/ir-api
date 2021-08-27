const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')
const isString = require('../../validation/isString')

const validation = {
  amount: ['isRequired', 'isPositiveNumber'],
  withdrawalAddress: ['isRequired'],
  comment: ['isRequired', isString(500)],
  destinationTag: [isString(50)]
}

// https://www.independentreserve.com/products/api#WithdrawDigitalCurrency
const withdrawDigitalCurrency = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ amount, withdrawalAddress, comment, primaryCurrencyCode, destinationTag }) => {
    const payload = {
      amount,
      withdrawalAddress,
      comment,
      primaryCurrencyCode,
      destinationTag
    }
    validateFields(payload, validation)
    const path = 'Private/WithdrawDigitalCurrency'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = withdrawDigitalCurrency
