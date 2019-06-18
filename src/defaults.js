const transportOptions = {
  baseURL: 'https://api.independentreserve.com',
  timeout: 2500
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'User-Agent': 'Independent Reserve Javascript API (github.com/davesag/ir-api)'
}

const defaultParams = {
  pageIndex: 1,
  pageSize: 25
}

module.exports = {
  defaultHeaders,
  defaultParams,
  transportOptions
}
