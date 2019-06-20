const makeValidationTest = require('../../helpers/makeValidationTest')

const isPositiveNumber = require('../../../src/validation/isPositiveNumber')

describe('validation/isPositiveNumber', () => {
  const makeTest = max => makeValidationTest(isPositiveNumber(max))

  context('without a maximum', () => {
    const err = 'Expected a positive number'
    const doTest = makeTest()

    ;[
      ['the number 5', 5, null],
      ['the string 5', '5', err],
      ['negative 1', -1, err],
      ['zero', 0, err],
      ['null', null, null],
      ['undefined', undefined, null],
      ['NaN', NaN, null]
    ].forEach(doTest)
  })

  context('when maximum is set to 10', () => {
    const err = 'Expected a positive number no greater than 10'
    const doTest = makeTest(10)

    ;[['the number 5', 5, null], ['the number 11', 11, err]].forEach(doTest)
  })
})
