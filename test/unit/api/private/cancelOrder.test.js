const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'cancelOrder',
  params: { orderGuid: 'abcd123' },
  useDefaults: false,
  validation: {
    orderGuid: ['isRequired']
  }
}

doTest(config)
