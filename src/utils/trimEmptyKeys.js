const defined = require('./defined')

const toBool = data => !!data

const trimEmptyKeys = data =>
  Object.keys(data).reduce(
    (acc, elem) => (defined(data[elem], toBool) ? { ...acc, [elem]: data[elem] } : acc),
    {}
  )

module.exports = trimEmptyKeys
