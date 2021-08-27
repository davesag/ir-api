const makeValidationTest = require('../../helpers/makeValidationTest')

const isOneOf = require('../../../src/validation/isOneOf')

describe('validation/isOneOf', () => {
  const makeTest = allowed => makeValidationTest(isOneOf(allowed))

  context('not given an allowed array', () => {
    const doTest = makeTest()

    doTest(['anything', 'anything', 'Expected one of '])
  })

  context('given an allowed array', () => {
    const allowed = ['number', 'one', 'fish', 'fry']
    const doTest = makeTest(allowed)
    const err = `Expected one of ${allowed.join(',')}`

    ;[
      ['number 1', 1, err],
      ['fish', 'fish', null],
      ['finger', 'finger', err],
      ['an empty string', '', null],
      ['undefined', undefined, null],
      ['null', null, null]
    ].forEach(doTest)
  })
})
