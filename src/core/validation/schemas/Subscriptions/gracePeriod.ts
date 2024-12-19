import Joi from 'joi'
import ErrorMessagesGenerator from '../../ErrorMessagesGenerator'

const gracePeriodFieldName = 'Grace Period'

const gracePeriodSchema = Joi
  .number()
  .required()
  .min(0)
  .max(365)
  .messages({
    'number.base': ErrorMessagesGenerator.emptyField(gracePeriodFieldName),
    'number.min':  'Grace Period should be between 0 and 365',
    'number.max':  'Grace Period should be between 0 and 365',
    'number.empty': ErrorMessagesGenerator.emptyField(gracePeriodFieldName) 
  })

export {
  gracePeriodSchema
}