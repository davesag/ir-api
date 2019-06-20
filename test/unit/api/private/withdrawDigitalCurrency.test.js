const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'withdrawDigitalCurrency',
  params: {
    amount: 0.123456,
    withdrawalAddress: '1BP2wi6UxQwG3oDuDj2V2Rvgu6PMJnJu61',
    comment: 'hello sailor',
    primaryCurrencyCode: 'Bch',
    destinationTag: '123456'
  },
  useDefaults: false,
  validation: {
    amount: ['isRequired'],
    withdrawalAddress: ['isRequired'],
    comment: ['isRequired']
  }
}

doTest(config)
