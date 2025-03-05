// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Joi from 'joi'
import ErrorMessagesGenerator from '../../ErrorMessagesGenerator'
import {
  namePattern, personalDataRules 
} from '../../rules/personalDetails.rules'


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
    'string.empty': ErrorMessagesGenerator.emptyField(firstNameFieldName) 
  })

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
    'string.empty': ErrorMessagesGenerator.emptyField(lastNameFieldName) 
  })

export {
  firstNameSchema,
  lastNameSchema
}