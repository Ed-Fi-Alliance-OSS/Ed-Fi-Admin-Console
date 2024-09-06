import Joi from "joi"
import ErrorMessagesGenerator from "../../ErrorMessagesGenerator"

const emailFieldName = "Email"
const emailSchema = Joi
    .string()
    .required()
    .email({tlds:{allow: false}})
    .messages({
        'string.base': ErrorMessagesGenerator.emptyField(emailFieldName),
        'string.email': ErrorMessagesGenerator.invalidEmail(),
        'string.empty': ErrorMessagesGenerator.emptyField(emailFieldName)})

export {
    emailSchema
}