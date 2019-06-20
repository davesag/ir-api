const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'cancelOrder',
  params: { orderGuid: 'dd015a29-8f73-4469-a5fa-ea91544dfcda' },
  useDefaults: false,
  validation: {
    orderGuid: ['isRequired', 'isGuid']
  }
}

doTest(config)
