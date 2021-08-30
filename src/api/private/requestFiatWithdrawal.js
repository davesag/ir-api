const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')
const isString = require('../../validation/isString')

const validation = {
  secondaryCurrencyCode: ['isRequired'],
  withdrawalAmount: ['isRequired', 'isPositiveNumber'],
  withdrawalBankAccountName: ['isRequired', 'isString'],
  comment: ['isRequired', isString(500)]
}

// https://www.independentreserve.com/products/api#RequestFiatWithdrawal
const requestFiatWithdrawal = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({
    secondaryCurrencyCode,
    withdrawalAmount,
    withdrawalBankAccountName,
    comment
  }) => {
    const payload = {
      secondaryCurrencyCode,
      withdrawalAmount,
      withdrawalBankAccountName,
      comment
    }
    // eslint-disable-next-line fp/no-unused-expression
    validateFields(payload, validation)
    const path = 'Private/RequestFiatWithdrawal'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = requestFiatWithdrawal
