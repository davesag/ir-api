const doTest = require('../../../helpers/privateHandlerTest')
const isPositiveNumber = require('../../../../src/validation/isPositiveNumber')

const config = {
  handler: 'getOpenOrders',
  params: { primaryCurrencyCode: 'Eth', secondaryCurrencyCode: 'Aud' },
  useDefaults: true,
  validation: {
    primaryCurrencyCode: ['isRequired'],
    secondaryCurrencyCode: ['isRequired'],
    pageIndex: ['isPositiveNumber'],
    pageSize: [isPositiveNumber(50)]
  }
}

doTest(config)
