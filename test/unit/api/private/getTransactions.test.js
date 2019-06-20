const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'getTransactions',
  params: {
    accountGuid: 'dd015a29-8f73-4469-a5fa-ea91544dfcda',
    fromTimestampUtc: '2014-08-01T08:00:00Z',
    toTimestampUtc: '2016-08-01T08:00:00Z',
    txTypes: ['Brokerage', 'Trade']
  },
  useDefaults: true,
  validation: {
    accountGuid: ['isRequired', 'isGuid'],
    fromTimestampUtc: ['isRequired'],
    toTimestampUtc: ['isRequired'],
    txTypes: ['isRequired']
  }
}

doTest(config)
