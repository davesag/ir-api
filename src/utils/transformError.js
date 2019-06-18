const transformError = error => ({
  code: error.code || 400,
  message: error.message || 'No error message received'
})

module.exports = transformError
