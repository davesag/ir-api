const doTest = require('../../../helpers/privateHandlerTest')
const isPositiveNumber = require('../../../../src/validation/isPositiveNumber')

const config = {
  handler: 'getOpenOrders',
  params: { primaryCurrencyCode: 'Eth', secondaryCurrencyCode: 'Aud' },
  useDefaults: true,
  validation: {
    pageIndex: ['isPositiveNumber'],
    pageSize: [isPositiveNumber(100)]
  }
}

doTest(config)
