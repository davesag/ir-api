const { encode } = require('querystring')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired']
}

const getOrderBook = async ({ primaryCurrencyCode, secondaryCurrencyCode }) => {
  const params = { primaryCurrencyCode, secondaryCurrencyCode }
  validateFields(params, validation)
  const { get } = getTransport()
  return get(`Public/GetOrderBook?${encode(params)}`)
}

module.exports = getOrderBook
