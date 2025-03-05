// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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
    'number.empty': ErrorMessagesGenerator.emptyField(numberOfLicensesFieldName) 
  })

export {
  numberOfLicensesSchema
}