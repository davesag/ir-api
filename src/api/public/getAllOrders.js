const { encode } = require('querystring')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired']
}

// https://www.independentreserve.com/products/api#GetAllOrders
const getAllOrders = async ({ primaryCurrencyCode, secondaryCurrencyCode }) => {
  const params = { primaryCurrencyCode, secondaryCurrencyCode }
  // eslint-disable-next-line fp/no-unused-expression
  validateFields(params, validation)
  const { get } = getTransport()
  return get(`Public/GetAllOrders?${encode(params)}`)
}

module.exports = getAllOrders
