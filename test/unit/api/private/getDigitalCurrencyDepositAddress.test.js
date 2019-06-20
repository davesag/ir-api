const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'getDigitalCurrencyDepositAddress',
  params: { primaryCurrencyCode: 'Eth' },
  useDefaults: false,
  validation: {
    primaryCurrencyCode: ['isRequired']
  }
}

doTest(config)
