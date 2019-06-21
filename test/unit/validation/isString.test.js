const makeValidationTest = require('../../helpers/makeValidationTest')

const isString = require('../../../src/validation/isString')

describe('validation/isString', () => {
  const makeTest = max => makeValidationTest(isString(max))

  context('without a maximum', () => {
    const err = 'Expected a string'
    const doTest = makeTest()

    ;[
      ['a string', 'hello', null],
      ['an empty string', '', null],
      ['undefined', undefined, null],
      ['null', null, null],
      ['NaN', NaN, null],
      ['a number', 1, err],
      ['an array', ['1'], err],
      ['an object', { one: '1' }, err]
    ].forEach(doTest)
  })

  context('when maximum length is set to 5', () => {
    const err = 'Expected a string no longer than 5 characters'
    const doTest = makeTest(5)

    ;[
      ['a short string', '12345', null],
      ['a long string', '123456', err]
    ].forEach(doTest)
  })
})
