const defined = require('./defined')

const toBool = data => !!data

const trimEmptyKeys = data =>
  Object.keys(data).reduce((acc, elem) => {
    if (defined(data[elem], toBool)) acc[elem] = data[elem]
    return acc
  }, {})

module.exports = trimEmptyKeys
