const { encode } = require('querystring')
const { getTransport } = require('../utils/transport')

const { get } = getTransport()

const getMarketSummary = async params =>
  get(`Public/GetMarketSummary?${encode(params)}`)

module.exports = getMarketSummary
