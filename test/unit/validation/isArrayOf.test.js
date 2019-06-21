const makeValidationTest = require('../../helpers/makeValidationTest')

const isArrayOf = require('../../../src/validation/isArrayOf')

describe('validation/isArrayOf', () => {
  const makeTest = allowed => makeValidationTest(isArrayOf(allowed))

  context('not given an allowed array', () => {
    const doTest = makeTest()
    const err = 'Expected an array'

    ;[
      ['an array', [1], null],
      ['an empty array', [], null],
      ['undefined', undefined, null],
      ['null', null, null],
      ['NaN', NaN, null],
      ['a number', 1, err],
      ['a string', '1', err],
      ['an object', { one: '1' }, err]
    ].forEach(doTest)
  })

  context('given an allowed array', () => {
    const allowed = ['number', 'one', 'fish', 'fry']
    const doTest = makeTest(allowed)
    const err = `Expected an array containing ${allowed.join(',')}`

    ;[
      ['an array with number 1 in it', [1], err],
      ['an array with fish and fry in it', ['fish', 'fry'], null],
      ['an array with fish and finger in it', ['fish', 'finger'], err],
      ['an empty array', [], null],
      ['undefined', undefined, null],
      ['null', null, null],
      ['NaN', NaN, null],
      ['a number', 1, err],
      ['a string', '1', err],
      ['an object', { one: '1' }, err]
    ].forEach(doTest)
  })
})
