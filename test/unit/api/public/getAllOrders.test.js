const doTest = require('../../../helpers/publicHandlerTest')

const config = {
  handler: 'getAllOrders',
  params: { primaryCurrencyCode: 'Xbt', secondaryCurrencyCode: 'Aud' },
  validation: {
    primaryCurrencyCode: ['isRequired'],
    secondaryCurrencyCode: ['isRequired']
  }
}

doTest(config)
