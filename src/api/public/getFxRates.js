const { getTransport } = require('../../utils/transport')

const getFxRates = async () => {
  const { get } = getTransport()
  return get('Public/GetFxRates')
}
module.exports = getFxRates
