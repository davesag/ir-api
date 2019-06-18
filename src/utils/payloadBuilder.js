const { createHmac } = require('crypto')
const {
  transportOptions: { baseURL }
} = require('../defaults')
const nextNonce = require('./nextNonce')
const trimEmptyKeys = require('./trimEmptyKeys')

const payloadBuilder = (apiKey, apiSecret) => (path, payload) => {
  const nonce = nextNonce()
  const data = trimEmptyKeys({
    apiKey,
    nonce,
    signature: 'placeholder',
    ...payload
  })

  const url = `${baseURL}/${path}`

  const message = Object.keys(data)
    .reduce(
      (acc, elem) => {
        if (elem !== 'signature') acc.push(`${elem}=${data[elem]}`)
        return acc
      },
      [url]
    )
    .join(',')

  const signer = createHmac('sha256', Buffer.from(apiSecret, 'utf8'))
  data.signature = signer
    .update(message)
    .digest('hex')
    .toUpperCase()
  return data
}

module.exports = payloadBuilder
