const doTest = require('../../../helpers/privateHandlerTest')
const isOneOf = require('../../../../src/validation/isOneOf')

const config = {
  handler: 'placeMarketOrder',
  params: {
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Aud',
    orderType: 'MarketOffer',
    volume: 0.25,
    volumeCurrencyType: 'Primary'
  },
  useDefaults: false,
  validation: {
    primaryCurrencyCode: ['isRequired'],
    secondaryCurrencyCode: ['isRequired'],
    orderType: ['isRequired', 'isString'],
    volume: ['isRequired', 'isPositiveNumber'],
    volumeCurrencyType: [isOneOf(['Primary', 'Secondary'])]
  }
}

doTest(config)
