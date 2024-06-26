const doTest = require('../../../helpers/privateHandlerTest')
const isPositiveNumber = require('../../../../src/validation/isPositiveNumber')
const isTime = require('../../../../src/validation/isTime')
const isOneOf = require('../../../../src/validation/isOneOf')

const fromTimestampUtc = '2014-08-01T08:00:00Z'
const toTimestampUtc = '2016-08-01T08:00:00Z'

const config1 = {
  handler: 'getTransactions',
  params: {
    accountGuid: 'dd015a29-8f73-4469-a5fa-ea91544dfcda',
    fromTimestampUtc,
    toTimestampUtc,
    txTypes: ['Brokerage', 'Trade']
  },
  useDefaults: true,
  validation: {
    accountGuid: ['isRequired', 'isGuid'],
    fromTimestampUtc: ['isRequired', isTime({ before: toTimestampUtc })],
    toTimestampUtc: ['isRequired', isTime({ after: fromTimestampUtc })],
    pageIndex: ['isPositiveNumber'],
    pageSize: [isPositiveNumber(5000)],
    includeTotals: [isOneOf(['true', 'false'])]
  }
}

doTest(config1) // test with missing includeTotals param

const config2 = {
  ...config1,
  params: {
    ...config1.params,
    includeTotals: 'false'
  }
}

doTest(config2)
