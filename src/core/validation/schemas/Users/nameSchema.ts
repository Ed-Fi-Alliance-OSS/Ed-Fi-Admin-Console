import Joi from 'joi'
import ErrorMessagesGenerator from '../../ErrorMessagesGenerator'
import { namePattern, personalDataRules } from '../../rules/personalDetails.rules'


const firstNameFieldName = 'First Name'
const firstNameSchema = Joi
  .string()
  .required()
  .regex(namePattern)
  .min(personalDataRules.name.min)
  .max(personalDataRules.name.max)
  .messages({
    'string.base': ErrorMessagesGenerator.emptyField(firstNameFieldName),
    'string.min':  ErrorMessagesGenerator.moreThan(firstNameFieldName, personalDataRules.name.min, 'letters'),
    'string.max':  ErrorMessagesGenerator.lessThan(firstNameFieldName, personalDataRules.name.max, 'letters'),
    'string.pattern.base': ErrorMessagesGenerator.onlyLetters(firstNameFieldName),
    'string.empty': ErrorMessagesGenerator.emptyField(firstNameFieldName)})

const lastNameFieldName = 'Last Name'
const lastNameSchema = Joi  
  .string()
  .required()
  .regex(namePattern)
  .min(personalDataRules.name.min)
  .max(personalDataRules.name.max)
  .messages({
    'string.base': ErrorMessagesGenerator.emptyField(''),
    'string.min':  ErrorMessagesGenerator.moreThan(lastNameFieldName, personalDataRules.name.min, 'letters'),
    'string.max':  ErrorMessagesGenerator.lessThan(lastNameFieldName, personalDataRules.name.max, 'letters'),
    'string.pattern.base': ErrorMessagesGenerator.onlyLetters(lastNameFieldName),
    'string.empty': ErrorMessagesGenerator.emptyField(lastNameFieldName)})

export {
  firstNameSchema,
  lastNameSchema
}