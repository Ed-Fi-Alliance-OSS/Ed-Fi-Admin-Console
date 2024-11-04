import Joi from 'joi'
import ErrorMessagesGenerator from '../../ErrorMessagesGenerator'

const numberOfLicensesFieldName = 'Number Of Licenses'
const numberOfLicensesSchema = Joi
  .number()
  .required()
  .min(-1)
  .max(100)
  .messages({
    'number.base': ErrorMessagesGenerator.emptyField(numberOfLicensesFieldName),
    'number.min':  `${numberOfLicensesFieldName} should be between 0 and 100`,
    'number.max':  `${numberOfLicensesFieldName} should be between 0 and 100`,
    'number.empty': ErrorMessagesGenerator.emptyField(numberOfLicensesFieldName)})

export {
  numberOfLicensesSchema
}