const { getTransport } = require('../../utils/transport')

const { get } = getTransport()

const getValidOrderTypes = async () => get('Public/GetValidOrderTypes')

module.exports = getValidOrderTypes
