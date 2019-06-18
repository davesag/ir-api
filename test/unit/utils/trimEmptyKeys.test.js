const { expect } = require('chai')
const trimEmptyKeys = require('../../../src/utils/trimEmptyKeys')

describe('utils/trimEmptyKeys', () => {
  const data = {
    one: 'one',
    two: undefined,
    three: NaN
  }

  const expected = { one: data.one }

  it('trims out the keys with undefined or NaN values', () => {
    expect(trimEmptyKeys(data)).to.deep.equal(expected)
  })
})
