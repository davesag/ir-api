const { getTransport } = require('../../utils/transport')

const { get } = getTransport()

const getFxRates = async () => get('Public/GetFxRates')

module.exports = getFxRates
