const doTest = require('../../../helpers/privateHandlerTest')
const isString = require('../../../../src/validation/isString')
const isOneOf = require('../../../../src/validation/isOneOf')

const config = {
  handler: 'withdrawFiatCurrency',
  params: {
    secondaryCurrencyCode: 'Aud',
    withdrawalAmount: 153.0,
    fiatBankAccountGuid: 'dd015a29-8f73-4469-a5fa-ea91544dfcda',
    useNpp: 'true',
    comment: 'hello sailor'
  },
  useDefaults: false,
  validation: {
    secondaryCurrencyCode: ['isRequired', isString(3)],
    withdrawalAmount: ['isRequired', 'isPositiveNumber'],
    fiatBankAccountGuid: ['isRequired', 'isGuid'],
    useNpp: [isOneOf(['true', 'false'])],
    comment: ['isRequired', isString(500)]
  }
}

doTest(config)
