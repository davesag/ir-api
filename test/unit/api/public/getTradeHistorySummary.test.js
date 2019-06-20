const doTest = require('../../../helpers/publicHandlerTest')

const config = {
  handler: 'getTradeHistorySummary',
  params: {
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Aud',
    numberOfHoursInThePastToRetrieve: 24
  },
  validation: {
    primaryCurrencyCode: ['isRequired'],
    secondaryCurrencyCode: ['isRequired'],
    numberOfHoursInThePastToRetrieve: ['isRequired', 'isPositiveNumber']
  }
}

doTest(config)
