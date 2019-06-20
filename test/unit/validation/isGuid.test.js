const makeValidationTest = require('../../helpers/makeValidationTest')

const isGuid = require('../../../src/validation/isGuid')

describe('validation/isGuid', () => {
  const doTest = makeValidationTest(isGuid)

  ;[
    ['a valid guid', '719c495c-a39e-4884-93ac-280b37245037', true],
    ['a different valid guid', 'dd015a29-8f73-4469-a5fa-ea91544dfcda', true],
    ['an invalid guid', '1234567890', false],
    ['an empty string', '', true],
    ['null', null, true],
    ['undefined', undefined, true],
    ['a number', 1234567, false],
    ['NaN', NaN, true]
  ].forEach(doTest)
})
