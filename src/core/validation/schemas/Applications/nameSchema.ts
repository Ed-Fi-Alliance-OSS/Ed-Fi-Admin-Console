// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Joi from 'joi'
import ErrorMessagesGenerator from '../../ErrorMessagesGenerator'

const applicationNameField = 'Application Name'
const maxNameLength = 50
const minNameLength = 2

const applicationNameSchema = Joi
  .string()
  .required()
  .min(minNameLength)
  .max(maxNameLength)
  .messages({
    'string.base': ErrorMessagesGenerator.emptyField(applicationNameField),
    'string.min':  ErrorMessagesGenerator.moreThan(applicationNameField, minNameLength - 1, 'letters'),
    'string.max':  ErrorMessagesGenerator.lessThan(applicationNameField, maxNameLength + 1, 'letters'),
    'string.empty': ErrorMessagesGenerator.emptyField(applicationNameField) 
  })

export default applicationNameSchema