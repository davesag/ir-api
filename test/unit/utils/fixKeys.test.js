const { expect } = require('chai')

const fixKeys = require('../../../src/utils/fixKeys')

describe('utils/fixKeys', () => {
  const original = {
    Some: 'data',
    With: {
      Nested: 'data'
    },
    And: ['an', 'array', 'of', 'strings'],
    AsWellAs: [{ An: 'array of objects' }]
  }

  const expected = {
    some: 'data',
    with: {
      nested: 'data'
    },
    and: ['an', 'array', 'of', 'strings'],
    asWellAs: [{ an: 'array of objects' }]
  }

  let result

  before(() => {
    result = fixKeys(original)
  })

  it('left the original untouched', () => {
    expect(original).not.to.deep.equal(expected)
  })

  it('fixed the keys', () => {
    expect(result).to.deep.equal(expected)
  })
})
