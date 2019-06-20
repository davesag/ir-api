const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'synchDigitalCurrencyDepositAddressWithBlockchain',
  params: {
    depositAddress: '1BP2wi6UxQwG3oDuDj2V2Rvgu6PMJnJu61',
    primaryCurrencyCode: 'Bch'
  },
  useDefaults: false,
  validation: {
    depositAddress: ['isRequired'],
    primaryCurrencyCode: ['isRequired']
  }
}

doTest(config)
