const doTest = require('../../../helpers/privateHandlerTest')
const isPositiveNumber = require('../../../../src/validation/isPositiveNumber')

const config = {
  handler: 'getTrades',
  params: {},
  useDefaults: true,
  validation: {
    pageIndex: ['isPositiveNumber'],
    pageSize: [isPositiveNumber(50)]
  }
}

doTest(config)
