const { encode } = require('querystring')
const { getTransport } = require('../../utils/transport')

const { get } = getTransport()

const getTradeHistorySummary = async params =>
  get(`Public/GetTradeHistorySummary?${encode(params)}`)

module.exports = getTradeHistorySummary
