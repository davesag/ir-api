const { encode } = require('querystring')
const { getTransport } = require('../../utils/transport')
const validate = require('../../validation')

const { get } = getTransport()

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired']
}

const getOrderBook = async ({ primaryCurrencyCode, secondaryCurrencyCode }) => {
  const params = { primaryCurrencyCode, secondaryCurrencyCode }
  validate(params, validation)
  return get(`Public/GetOrderBook?${encode(params)}`)
}

module.exports = getOrderBook
