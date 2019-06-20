const makeValidationTest = require('../../helpers/makeValidationTest')

const isString = require('../../../src/validation/isString')

describe('validation/isString', () => {
  const doTest = makeValidationTest(isString)

  ;[
    ['a string', 'hello', true],
    ['an empty string', '', true],
    ['undefined', undefined, true],
    ['null', null, true],
    ['NaN', NaN, true],
    ['a number', 1, false],
    ['an array', ['1'], false],
    ['an object', { one: '1' }, false]
  ].forEach(doTest)
})
