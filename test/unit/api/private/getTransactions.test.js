const doTest = require('../../../helpers/privateHandlerTest')
const isPositiveNumber = require('../../../../src/validation/isPositiveNumber')
const isArrayOf = require('../../../../src/validation/isArrayOf')
const isTime = require('../../../../src/validation/isTime')

const fromTimestampUtc = '2014-08-01T08:00:00Z'
const toTimestampUtc = '2016-08-01T08:00:00Z'

const config = {
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
    txTypes: ['isRequired', isArrayOf(['Brokerage', 'Trade'])],
    pageIndex: ['isPositiveNumber'],
    pageSize: [isPositiveNumber(5000)]
  }
}

doTest(config)
