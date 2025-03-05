// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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