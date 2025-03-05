// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Joi from 'joi'
import ErrorMessagesGenerator from '../../ErrorMessagesGenerator'
import { personalDataRules } from '../../rules/personalDetails.rules'

const partnerNameField = 'Vendor Name'

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
    'string.pattern.base': 'Field must only contain alpha-numeric characters and/or spaces', 
  })

export default partnerNameSchema