const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'getDigitalCurrencyWithdrawal',
  params: { transactionGuid: 'dd015a29-8f73-4469-a5fa-ea91544dfcda' },
  useDefaults: false,
  validation: {
    transactionGuid: ['isRequired', 'isGuid']
  }
}

doTest(config)
