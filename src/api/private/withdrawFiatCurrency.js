const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')
const isString = require('../../validation/isString')
const isOneOf = require('../../validation/isOneOf')

const validation = {
  secondaryCurrencyCode: ['isRequired', isString(3)],
  withdrawalAmount: ['isRequired', 'isPositiveNumber'],
  fiatBankAccountGuid: ['isRequired', 'isGuid'],
  useNpp: [isOneOf(['true', 'false'])],
  comment: ['isRequired', isString(500)]
}

// https://www.independentreserve.com/products/api#WithdrawFiatCurrency
const withdrawFiatCurrency = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({
    secondaryCurrencyCode,
    withdrawalAmount,
    fiatBankAccountGuid,
    useNpp,
    comment
  }) => {
    const payload = {
      secondaryCurrencyCode,
      withdrawalAmount,
      fiatBankAccountGuid,
      useNpp,
      comment
    }
    // eslint-disable-next-line fp/no-unused-expression
    validateFields(payload, validation)
    const path = 'Private/WithdrawFiatCurrency'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = withdrawFiatCurrency
