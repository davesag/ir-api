const doTest = require('../../../helpers/privateHandlerTest')
const isPositiveNumber = require('../../../../src/validation/isPositiveNumber')

const config = {
  handler: 'getDigitalCurrencyDepositAddresses',
  params: { primaryCurrencyCode: 'Eth' },
  useDefaults: true,
  validation: {
    primaryCurrencyCode: ['isRequired'],
    pageIndex: ['isPositiveNumber'],
    pageSize: [isPositiveNumber(50)]
  }
}

doTest(config)
