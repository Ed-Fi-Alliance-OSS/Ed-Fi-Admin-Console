// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Joi from 'joi'
import ErrorMessagesGenerator from '../../ErrorMessagesGenerator'

const operationalContextURIField = 'Operational Context URI'

const operationalContextURISchema = Joi
  .string()
  .required()
  .messages({
    'string.base': ErrorMessagesGenerator.emptyField(operationalContextURIField),
    'string.empty': ErrorMessagesGenerator.emptyField(operationalContextURIField) 
  })

export default operationalContextURISchema