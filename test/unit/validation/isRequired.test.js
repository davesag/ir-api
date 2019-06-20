const { expect } = require('chai')

const isRequired = require('../../../src/validation/isRequired')

describe('validation/isRequired', () => {
  const doTest = ([label, value, expected]) => {
    context(`given ${label}`, () => {
      it(`returns ${expected}`, () => {
        expect(isRequired(value)).to.equal(expected)
      })
    })
  }

  ;[
    ['NaN', NaN, false],
    ['number 5', 5, true],
    ['number 0', 0, true],
    ['string', 'test', true],
    ['empty string', '', false],
    ['empty array', [], false],
    ['array', ['test'], true],
    ['object', { test: 'test' }, true],
    ['empty object', {}, false],
    ['undefined', undefined, false],
    ['null', null, false]
  ].forEach(doTest)
})
