const makeValidationTest = require('../../helpers/makeValidationTest')

const isRequired = require('../../../src/validation/isRequired')

describe('validation/isRequired', () => {
  const doTest = makeValidationTest(isRequired)

  ;[
    ['NaN', NaN, false],
    ['the number 5', 5, true],
    ['the number 0', 0, true],
    ['a string', 'test', true],
    ['an empty string', '', false],
    ['an empty array', [], false],
    ['an array', ['test'], true],
    ['an object', { test: 'test' }, true],
    ['an empty object', {}, false],
    ['undefined', undefined, false],
    ['null', null, false]
  ].forEach(doTest)
})
