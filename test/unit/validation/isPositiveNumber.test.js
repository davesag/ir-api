const makeValidationTest = require('../../helpers/makeValidationTest')

const isPositiveNumber = require('../../../src/validation/isPositiveNumber')

describe('validation/isPositiveNumber', () => {
  const doTest = makeValidationTest(isPositiveNumber)

  ;[
    ['the number 5', 5, true],
    ['the string 5', '5', false],
    ['negative 1', -1, false],
    ['zero', 0, false],
    ['null', null, true],
    ['undefined', undefined, true],
    ['NaN', NaN, true]
  ].forEach(doTest)
})
