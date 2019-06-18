const { encode } = require('querystring')
const { getTransport } = require('../../utils/transport')

const { get } = getTransport()

const getRecentTrades = async params =>
  get(`Public/GetRecentTrades?${encode(params)}`)

module.exports = getRecentTrades
