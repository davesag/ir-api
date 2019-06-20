const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const validate = require('../../validation')

const { post } = getTransport()

const validation = {
  secondaryCurrencyCode: ['isRequired'],
  withdrawalAmount: ['isRequired'],
  withdrawalBankAccountName: ['isRequired'],
  comment: ['isRequired']
}

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
    validate(payload, validation)
    const path = 'Private/RequestFiatWithdrawal'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = requestFiatWithdrawal
