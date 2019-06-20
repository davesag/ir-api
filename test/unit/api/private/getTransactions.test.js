const doTest = require('../../../helpers/privateHandlerTest')

const config = {
  handler: 'getTransactions',
  params: {
    accountGuid: 'ABCD12345',
    fromTimestampUtc: '2014-08-01T08:00:00Z',
    toTimestampUtc: '2016-08-01T08:00:00Z',
    txTypes: ['Brokerage', 'Trade']
  },
  useDefaults: true,
  validation: {
    accountGuid: ['isRequired'],
    fromTimestampUtc: ['isRequired'],
    toTimestampUtc: ['isRequired'],
    txTypes: ['isRequired']
  }
}

doTest(config)
