// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Joi from 'joi'
import ErrorMessagesGenerator from '../../ErrorMessagesGenerator'

const namespacePrefixesField = 'Namespace Prefixes'

const namespacePrefixesSchema = Joi
  .string()
  .allow('')
  .min(0)
  .max(250)
  .messages({
    'string.base': ErrorMessagesGenerator.emptyField(namespacePrefixesField),
    'string.min':  ErrorMessagesGenerator.moreThan(namespacePrefixesField, 0, 'characters'),
    'string.max':  ErrorMessagesGenerator.lessThan(namespacePrefixesField, 250, 'characters')
  })

export default namespacePrefixesSchema