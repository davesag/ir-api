const { expect } = require('chai')

const ValidationError = require('../../../src/errors/ValidationError')

describe('errors/ValidationError', () => {
  const message = 'a message'
  const fields = { orderGuid: 'missing' }
  const error = new ValidationError(message, fields)

  it('has the message', () => {
    expect(error).to.have.property('message', message)
  })

  it('has the fields', () => {
    expect(error.fields).to.deep.equal(fields)
  })
})
