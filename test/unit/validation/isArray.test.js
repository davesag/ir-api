const makeValidationTest = require('../../helpers/makeValidationTest')

const isArray = require('../../../src/validation/isArray')

describe('validation/isArray', () => {
  const doTest = makeValidationTest(isArray)
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
