const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'getDigitalCurrencyDepositAddresses',
  params: { primaryCurrencyCode: 'Eth' },
  useDefaults: true,
  validation: {
    primaryCurrencyCode: ['isRequired'],
    pageIndex: ['isPositiveNumber'],
    pageSize: ['isPositiveNumber']
  }
}

doTest(config)
