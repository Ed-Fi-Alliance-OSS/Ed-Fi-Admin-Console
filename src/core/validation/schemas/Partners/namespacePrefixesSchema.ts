import Joi from "joi"
import ErrorMessagesGenerator from "../../ErrorMessagesGenerator"

const namespacePrefixesField = "Namespace Prefixes"
const namespacePrefixesSchema = Joi
    .string()
    .allow("")
    .min(0)
    .max(250)
    .messages({
        'string.base': ErrorMessagesGenerator.emptyField(namespacePrefixesField),
        'string.min':  ErrorMessagesGenerator.moreThan(namespacePrefixesField, 0, 'characters'),
        'string.max':  ErrorMessagesGenerator.lessThan(namespacePrefixesField, 250, 'characters')
    })

export default namespacePrefixesSchema