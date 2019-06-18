const { expect } = require('chai')

const transformError = require('../../../src/utils/transformError')

describe('utils/transformError', () => {
  context('if the error has no details', () => {
    const error = {}

    const expected = {
      code: 400,
      message: 'No error message received'
    }

    let result

    before(() => {
      result = transformError(error)
    })

    it('returned the expected data', () => {
      expect(result).to.deep.equal(expected)
    })
  })

  context('if the error has details', () => {
    const error = {
      code: 400,
      message: 'oops'
    }

    const expected = {
      code: error.code,
      message: error.message
    }

    let result

    before(() => {
      result = transformError(error)
    })

    it('returned the expected data', () => {
      expect(result).to.deep.equal(expected)
    })
  })
})
