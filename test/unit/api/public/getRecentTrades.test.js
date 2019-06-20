const doTest = require('../../../helpers/publicHandlerTest')

const config = {
  handler: 'getRecentTrades',
  params: {
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Aud',
    numberOfRecentTradesToRetrieve: 25
  },
  validation: {
    primaryCurrencyCode: ['isRequired'],
    secondaryCurrencyCode: ['isRequired'],
    numberOfRecentTradesToRetrieve: ['isRequired']
  }
}

doTest(config)
