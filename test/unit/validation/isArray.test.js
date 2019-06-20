const makeValidationTest = require('../../helpers/makeValidationTest')

const isArray = require('../../../src/validation/isArray')

describe('validation/isArray', () => {
  const doTest = makeValidationTest(isArray)

  ;[
    ['an array', [1], true],
    ['an empty array', [], true],
    ['undefined', undefined, true],
    ['null', null, true],
    ['NaN', NaN, true],
    ['a number', 1, false],
    ['a string', '1', false],
    ['an object', { one: '1' }, false]
  ].forEach(doTest)
})
