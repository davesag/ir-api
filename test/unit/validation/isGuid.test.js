const makeValidationTest = require('../../helpers/makeValidationTest')

const isGuid = require('../../../src/validation/isGuid')

describe('validation/isGuid', () => {
  const doTest = makeValidationTest(isGuid)
  const err = 'Invalid GUID'

  ;[
    ['a valid guid', '719c495c-a39e-4884-93ac-280b37245037', null],
    ['a different valid guid', 'dd015a29-8f73-4469-a5fa-ea91544dfcda', null],
    ['an invalid guid', '1234567890', err],
    ['an empty string', '', null],
    ['null', null, null],
    ['undefined', undefined, null],
    ['a number', 1234567, err],
    ['NaN', NaN, null]
  ].forEach(doTest)
})
