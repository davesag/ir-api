const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'getOrderDetails',
  params: { orderGuid: 'ABCd12345' },
  useDefaults: false,
  validation: {
    orderGuid: ['isRequired']
  }
}

doTest(config)
