const { encode } = require('querystring')
const { getTransport } = require('../utils/transport')

const { get } = getTransport()

const getOrderBook = async params =>
  get(`Public/GetOrderBook?${encode(params)}`)

module.exports = getOrderBook
