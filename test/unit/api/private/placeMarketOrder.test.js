const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'placeMarketOrder',
  params: {
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Aud',
    orderType: 'MarketOffer',
    volume: 0.25
  },
  useDefaults: false,
  validation: {
    primaryCurrencyCode: ['isRequired'],
    secondaryCurrencyCode: ['isRequired'],
    orderType: ['isRequired'],
    volume: ['isRequired']
  }
}

doTest(config)
