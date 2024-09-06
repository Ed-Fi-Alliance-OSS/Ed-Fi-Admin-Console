import Joi from "joi"
import ErrorMessagesGenerator from "../../ErrorMessagesGenerator"

const applicationNameField = "Application Name"
const maxNameLength = 63
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
        'string.empty': ErrorMessagesGenerator.emptyField(applicationNameField)})

export default applicationNameSchema