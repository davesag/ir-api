const { expect } = require('chai')

const ValidationError = require('../../../src/errors/ValidationError')
const { validateFields } = require('../../../src/validation')
const isString = require('../../../src/validation/isString')
const isOneOf = require('../../../src/validation/isOneOf')

describe('validation', () => {
  describe('#validateFields', () => {
    context('given plain old validation names', () => {
      const validations = { orderGuid: ['isRequired'] }

      let error

      context('given a missing required field', () => {
        const payload = { orderGuid: undefined, ignoreMe: undefined }

        before(() => {
          try {
            validateFields(payload, validations)
          } catch (err) {
            error = err
          }
        })

        it('threw a ValidationError', () => {
          expect(error).to.be.instanceof(ValidationError)
        })

        it('put the expected errors in the error', () => {
          expect(error.errors).to.deep.equal({
            orderGuid: [[undefined, 'Field is required']]
          })
        })
      })

      context('given a non-missing required field', () => {
        const payload = { orderGuid: 'dd015a29-8f73-4469-a5fa-ea91544dfcda' }

        it('does not throw an error', () =>
          expect(() => {
            validateFields(payload, validations)
          }).not.to.throw())
      })
    })

    context('given a string field with a max', () => {
      const validations = { comment: [isString(10)] }
      const payload = { comment: '1234567890' }

      it('does not throw an error', () =>
        expect(() => {
          validateFields(payload, validations)
        }).not.to.throw())
    })

    context('given one of an array of allowed strings', () => {
      const validations = { volumeCurrencyType: [isOneOf(['Primary', 'Secondary'])] }
      const payload = { volumeCurrencyType: 'Primary' }

      it('does not throw an error', () =>
        expect(() => {
          validateFields(payload, validations)
        }).not.to.throw())
    })
  })
})
