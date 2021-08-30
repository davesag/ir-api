const doTest = require('../../../helpers/privateHandlerTest')
const isPositiveNumber = require('../../../../src/validation/isPositiveNumber')

const config = {
  handler: 'getTradesByOrder',
  params: { orderGuid: 'dd015a29-8f73-4469-a5fa-ea91544dfcda' },
  useDefaults: true,
  validation: {
    orderGuid: ['isRequired', 'isGuid'],
    pageIndex: ['isPositiveNumber'],
    pageSize: [isPositiveNumber(50)]
  }
}

doTest(config)
