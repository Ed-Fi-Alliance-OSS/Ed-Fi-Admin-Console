import Joi from 'joi'
import ErrorMessagesGenerator from '../../ErrorMessagesGenerator'
import { personalDataRules } from '../../rules/personalDetails.rules'

const partnerNameField = 'Partner Name'
const partnerNameSchema = Joi
  .string()
  .required()
  .regex(/^[a-z0-9 ]+$/i)
  .min(personalDataRules.name.min)
  .max(personalDataRules.name.max)
  .messages({
    'string.base': ErrorMessagesGenerator.emptyField(partnerNameField),
    'string.empty': ErrorMessagesGenerator.emptyField(partnerNameField),
    'string.min':  ErrorMessagesGenerator.moreThan(partnerNameField, personalDataRules.name.min, 'letters'),
    'string.max':  ErrorMessagesGenerator.lessThan(partnerNameField, personalDataRules.name.max, 'letters'),
    'string.pattern.base': 'Field must only contain alpha-numeric characters and/or spaces',})

export default partnerNameSchema