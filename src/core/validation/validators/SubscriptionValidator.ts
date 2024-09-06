import { SubscriptionFormData } from "../../../hooks/adminActions/subscriptions/useSubscriptionsForm.types";
import ErrorMessagesGenerator from "../ErrorMessagesGenerator";
import { FieldError, FormDataErrors, ValidateFieldParams } from "../FormValidations.types";
import { gracePeriodSchema } from "../schemas/Subscriptions/gracePeriod";
import { numberOfLicensesSchema } from "../schemas/Subscriptions/numberOfLicenses";
import ValidationErrorsMapper from "./ValidationErrorsMapper";

export type SubscriptionValidatorFields = "subscriptionDuration" | "selectApplication" | "gracePeriod" | "numberOfLicenses"

export class SubscriptionValidator {
    public static validateField({ data, field }: ValidateFieldParams<SubscriptionFormData, SubscriptionValidatorFields>): FieldError | null {
        if (field === 'subscriptionDuration')
            return this.validateSubscriptionDuration(data.startDateTime, data.endDateTime)
        else if (field === 'selectApplication')
            return this.validateHasSelectedApplication(data.applicationId)
        else if (field === 'gracePeriod')
            return this.validateGracePeriod(data.gracePeriod)
        else if (field === 'numberOfLicenses')
            return this.validateNumberOfLicenses(data.numberOfLicenses)

        return null
    }

    private static validateSubscriptionDuration(startDate: Date | null, endDate: Date | null) : FieldError | null {
        console.log('validate subscription duration')

        if (startDate === null)
            return { message: ErrorMessagesGenerator.emptyField("Start Date") }
        if (endDate === null)
            return { message: ErrorMessagesGenerator.emptyField("End Date") }

        const difference = endDate.getTime() - startDate.getTime()
        const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

        console.log("total days difference", totalDays)

        if (totalDays < 30)
            return { message: "Subscription Duration should be 30 days or greater." }

        return null
    }

    private static validateHasSelectedApplication(subscriptionId: string) : FieldError | null {
        if (subscriptionId === "")
            return { message: "Select Application" }

        if (subscriptionId === "Select the Application")
            return { message: "Select Application" }

        return null
    }

    private static validateGracePeriod(value: any) : FieldError | null {
        console.log('validate grace period', value)
        const { error } = gracePeriodSchema.validate(value)

        if (error)
            return ValidationErrorsMapper.map(error)

        return null
    }

    private static validateNumberOfLicenses(value: any) : FieldError | null {
        const { error } = numberOfLicensesSchema.validate(value)

        if (error)
            return ValidationErrorsMapper.map(error)

        return null
    }

    public static validateAll() : FormDataErrors | null {
        return {
            'field': { message: "" }
        }
    }
}