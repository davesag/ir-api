const doTest = require('../../../helpers/privateHandlerTest')
const isString = require('../../../../src/validation/isString')

const config = {
  handler: 'requestFiatWithdrawal',
  params: {
    secondaryCurrencyCode: 'Aud',
    withdrawalAmount: 12345.67,
    withdrawalBankAccountName: 'Bob',
    comment: 'hello sailor'
  },
  useDefaults: false,
  validation: {
    secondaryCurrencyCode: ['isRequired'],
    withdrawalAmount: ['isRequired', 'isPositiveNumber'],
    withdrawalBankAccountName: ['isRequired', 'isString'],
    comment: ['isRequired', isString(500)]
  }
}

doTest(config)
