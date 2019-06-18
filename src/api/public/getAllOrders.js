const { encode } = require('querystring')
const { getTransport } = require('../../utils/transport')

const { get } = getTransport()

const getAllOrders = async params =>
  get(`Public/GetAllOrders?${encode(params)}`)

module.exports = getAllOrders
