import Joi from 'joi'
import ErrorMessagesGenerator from '../../ErrorMessagesGenerator'

const operationalContextURIField = 'Operational Context URI'
const operationalContextURISchema = Joi
  .string()
  .required()
  .messages({
    'string.base': ErrorMessagesGenerator.emptyField(operationalContextURIField),
    'string.empty': ErrorMessagesGenerator.emptyField(operationalContextURIField)})

export default operationalContextURISchema