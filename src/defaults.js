const transportOptions = {
  baseURL: 'https://api.independentreserve.com',
  timeout: 1000
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'User-Agent': 'Independent Reserve Javascript API (github.com/davesag/ir-api)'
}

module.exports = {
  transportOptions,
  defaultHeaders
}
