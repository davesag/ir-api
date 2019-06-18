const { expect } = require('chai')

const transformResponse = require('../../../src/utils/transformResponse')

describe('utils/transformResponse', () => {
  const response = {
    data: {
      Some: 'data',
      With: {
        Nested: 'data'
      }
    }
  }

  const expected = {
    some: 'data',
    with: {
      nested: 'data'
    }
  }

  let result

  before(() => {
    result = transformResponse(response)
  })

  it('returned the expected data', () => {
    expect(result).to.deep.equal(expected)
  })
})
