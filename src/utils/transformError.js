const transformError = error => ({
  status: error.response.status,
  message: error.response.data
})

module.exports = transformError
