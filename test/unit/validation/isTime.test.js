const makeValidationTest = require('../../helpers/makeValidationTest')

const isTime = require('../../../src/validation/isTime')

describe('validation/isTime', () => {
  const makeTest = constraints => makeValidationTest(isTime(constraints))

  context('without constraints', () => {
    const err = string => `${string} is not an ISO Date string`
    const doTest = makeTest()

    ;[
      ['a valid date', '2019-06-21T08:38:47.407Z', null],
      ['some rubbish', 'bollocks', err('bollocks')],
      ['an empty string', '', null],
      ['undefined', undefined, null],
      ['null', null, null],
      ['NaN', NaN, null],
      ['a number', 1, err(1)],
      ['an array', ['1'], err([1])],
      ['an object', { one: '1' }, err({ one: '1' })]
    ].forEach(doTest)
  })

  context('when there are constraints', () => {
    const before = '2019-06-30T23:59:59.999Z'
    const after = '2019-04-30T23:59:59.999Z'

    context(`given before: ${before}`, () => {
      const err = string => `Expected time to be before ${before}`
      const doTest = makeTest({ before })

      ;[
        ['2019-05-01', '2019-05-01T00:00:00.000Z', null],
        ['2019-07-01', '2019-07-01T00:00:00.000Z', err('2019-07-01T00:00:00.000Z')]
      ].forEach(doTest)
    })

    context(`given after: ${after}`, () => {
      const err = string => `Expected time to be after ${after}`
      const doTest = makeTest({ after })

      ;[
        ['2019-05-01', '2019-05-01T00:00:00.000Z', null],
        ['2019-03-01', '2019-03-01T00:00:00.000Z', err('2019-03-01T00:00:00.000Z')]
      ].forEach(doTest)
    })

    context(`between ${after} and ${before}`, () => {
      const err = string => `Expected time to be between ${after} and ${before}`
      const doTest = makeTest({ before, after })

      ;[
        ['2019-05-01', '2019-05-01T00:00:00.000Z', null],
        ['2019-07-01', '2019-07-01T00:00:00.000Z', err('2019-07-01T00:00:00.000Z')]
      ].forEach(doTest)
    })
  })
})
