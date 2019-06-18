const { expect } = require('chai')

const transformError = require('../../../src/utils/transformError')

describe('utils/transformError', () => {
  const error = {
    response: {
      status: 404,
      data: 'some message'
    }
  }

  const expected = {
    status: error.response.status,
    message: error.response.data
  }

  let result

  before(() => {
    result = transformError(error)
  })

  it('returned the expected data', () => {
    expect(result).to.deep.equal(expected)
  })
})
