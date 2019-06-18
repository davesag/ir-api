const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')

const { post } = getTransport()

const requestFiatWithdrawal = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async (params = {}) => {
    const payload = {
      secondaryCurrencyCode: params.secondaryCurrencyCode,
      withdrawalAmount: params.withdrawalAmount,
      withdrawalBankAccountName: params.withdrawalBankAccountName,
      comment: params.comment
    }
    const path = 'Private/RequestFiatWithdrawal'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = requestFiatWithdrawal
