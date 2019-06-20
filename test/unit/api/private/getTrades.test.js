const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'getTrades',
  params: {},
  useDefaults: true,
  validation: {
    pageIndex: ['isPositiveNumber'],
    pageSize: ['isPositiveNumber']
  }
}

doTest(config)
