const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'getFiatWithdrawal',
  params: { fiatWithdrawalRequestGuid: 'dd015a29-8f73-4469-a5fa-ea91544dfcda' },
  useDefaults: false,
  validation: {
    fiatWithdrawalRequestGuid: ['isRequired', 'isGuid']
  }
}

doTest(config)
