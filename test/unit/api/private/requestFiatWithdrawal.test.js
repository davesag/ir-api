const doTest = require('../../../helpers/privateHandlerTest')

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
    withdrawalAmount: ['isRequired'],
    withdrawalBankAccountName: ['isRequired'],
    comment: ['isRequired']
  }
}

doTest(config)
