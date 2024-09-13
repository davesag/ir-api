const { createHmac } = require('crypto')
const {
  transportOptions: { baseURL }
} = require('../defaults')
const nextNonce = require('./nextNonce')
const trimEmptyKeys = require('./trimEmptyKeys')

const payloadBuilder =
  (apiKey, apiSecret) =>
  (path, payload = {}) => {
    const nonce = nextNonce()
    const data = trimEmptyKeys({
      apiKey,
      nonce,
      signature: 'placeholder', // here because order of keys is important
      ...payload
    })

    const url = `${baseURL}/${path}`

    const message = Object.keys(data)
      .reduce(
        (acc, elem) =>
          elem === 'signature'
            ? acc
            : Array.isArray(data[elem])
              ? [...acc, `${elem}=${data[elem].join(',')}`]
              : [...acc, `${elem}=${data[elem]}`],
        [url]
      )
      .join(',')

    const signer = createHmac('sha256', Buffer.from(apiSecret, 'utf8'))
    // eslint-disable-next-line fp/no-mutation
    data.signature = signer.update(message).digest('hex').toUpperCase()
    return data // order of keys is important
  }

module.exports = payloadBuilder
