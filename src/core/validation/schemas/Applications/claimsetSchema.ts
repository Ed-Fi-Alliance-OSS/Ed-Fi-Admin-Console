import Joi from "joi"
import ErrorMessagesGenerator from "../../ErrorMessagesGenerator"

const claimsetField = "Claim Set"
const claimsetSchema = Joi
    .string()
    .required()
    .messages({
        'string.base': ErrorMessagesGenerator.emptyField(claimsetField),
        'string.empty': ErrorMessagesGenerator.emptyField(claimsetField)})

export default claimsetSchema