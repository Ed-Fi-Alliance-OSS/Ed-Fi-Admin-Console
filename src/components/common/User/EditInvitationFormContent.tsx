import { Flex } from "@chakra-ui/react"
import AppUserDetailsForm from './AppUserDetailsForm'
import AppUserSubscriptionsForm from './AppUserSubscriptionsForm'
import { ChangeEvent } from "react"
import { CreateUserFormData, RoleOption, SubscriptionOption, UserFormMode } from "../../../hooks/adminActions/users/useCreateUserForm.types"
import { CompleteFormErrorMessage } from "@edwire/edx-portal-shared"
import { FormDataErrors } from "../../../core/validation/FormValidations.types"

interface EditInvitationFormContentProps {
    mode: UserFormMode
    userData: CreateUserFormData
    roleOptions: RoleOption[]
    subscriptionOptionsList: SubscriptionOption[]
    hasTriedSubmit: boolean
    errors: FormDataErrors
    onChangeMode: (value: string) => void
    onToggleIsAdmin: () => void
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onRoleSelect: (e: ChangeEvent<HTMLSelectElement>) => void
    onSelectApplicationRoleForUser: (subscriptionId: string, role: string) => void
    onSubscriptionToggle: (applicationId: string, subscriptionId: string) => void
}

const EditInvitationFormContent = ({ mode, userData, roleOptions, subscriptionOptionsList, errors, hasTriedSubmit, onToggleIsAdmin, onInputChange, onRoleSelect, onSelectApplicationRoleForUser, onSubscriptionToggle }: EditInvitationFormContentProps) => {
    return (
        <Flex flexDir='column' w='full'>
            {Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage />}
            <Flex flexDir='column' mt={mode !== 'Invite Admin'? '24px' : '0px'} w='full'>
               <AppUserDetailsForm 
                    mode={mode}
                    userData={userData}
                    onToggleIsAdmin={onToggleIsAdmin}
                    roleOptions={roleOptions}
                    isEmailDisabled={true}
                    errors={errors}
                    onInputChange={onInputChange}
                    onSelectChange={onRoleSelect} />
            </Flex>
            {mode !== 'Invite Admin' && <Flex mt='24px' w='full'>
                <AppUserSubscriptionsForm
                    isImplicit={() => false}
                    isFetchingProfile={false}
                    subscriptionsList={subscriptionOptionsList}
                    onSelectRoleForUser={onSelectApplicationRoleForUser}
                    onSubscriptionToggle={onSubscriptionToggle} />
            </Flex>}
        </Flex>
    )
}

export default EditInvitationFormContent