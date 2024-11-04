import Joi from 'joi'
import ErrorMessagesGenerator from '../../ErrorMessagesGenerator'

const vendorIdField = 'Vendor'
const vendorIdSchema = Joi
  .number()
  .required()
  .messages({
    'number.base': ErrorMessagesGenerator.emptyField(vendorIdField),
    'number.empty': ErrorMessagesGenerator.emptyField(vendorIdField)})

export default vendorIdSchema