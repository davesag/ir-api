const doTest = require('../../../helpers/privateHandlerTest')
const isString = require('../../../../src/validation/isString')

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
    amount: ['isRequired', 'isPositiveNumber'],
    withdrawalAddress: ['isRequired'],
    comment: ['isRequired', isString(500)],
    destinationTag: [isString(50)]
  }
}

doTest(config)
