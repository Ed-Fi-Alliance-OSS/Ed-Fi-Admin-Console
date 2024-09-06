import { Flex } from "@chakra-ui/react"
import { EdfiApplication } from "../../../core/Edfi/EdfiApplications"
import useApplicationForm from "../../../hooks/adminActions/edfi/useApplicationForm"
import { CompleteFormErrorMessage, UserProfile, UserProfileContext } from "@edwire/edx-portal-shared"
import ApplicationAPIFormSection from "./ApplicationAPIFormSection"
import ApplicationDetailsFormSection from "./ApplicationDetailsFormSection"
import LocalEducationAgenciesFormSection from "./LocalEducationAgenciesFormSection"
import { useContext } from "react"
import useTenantInfo from "../../../hooks/useTenantInfo"
import EdFiModalForm from "./EdFiModalForm"
import { ODSInstance } from "../../../core/ODSInstance.types"

interface ApplicationFormProps {
    instance: ODSInstance | null
    schoolYear: number 
    mode: 'add' | 'edit'
    editApplicationData?: EdfiApplication
    onFinishSave: () => void
}

const ApplicationForm = ({ instance, schoolYear, mode, editApplicationData, onFinishSave }: ApplicationFormProps) => {
    const {
        applicationData,
        vendorOptionsList,
        claimsOptionsList,
        operationalContext,
        applicationAuthData,
        isSaving,
        isRegeneratingCredentials,
        hasTriedSubmit,
        errors,
        onRegenerateCredentials,
        onChangeInput,
        onToggleOrgId,
        onSelectClaim,
        onSelectVendor,
        onSave
    } = useApplicationForm({ 
        schoolYear,
        mode, 
        editApplicationData, 
        onFinishSave 
    })

    const { getCurrentTenant } = useTenantInfo()
    const { userProfile } = useContext(UserProfileContext)

    const getCurrentTenantOrgName = (profile: UserProfile | null) => {
        if (profile) {
            const tenant = getCurrentTenant()

            if (tenant) 
                return tenant.organizationName

            return "Loading..."
        }

        return "Loading..."
    }

    const showApplicationAPIData = () => applicationAuthData.key && applicationAuthData.secret

    const getLocalEducationOrgId = () => {
        const currentTenant = getCurrentTenant()

        if (currentTenant)
            return currentTenant.organizationIdentifier

        return "..."
    }

    return (
        <EdFiModalForm
            actionText="save"
            headerText={mode === 'add'? 'Add Application' : 'Edit Application'}
            isSaving={isSaving}
            onSave={onSave}
            onClose={onFinishSave}
            content={<Flex w='full'>
                <Flex flexDir='column' w='full'>
                    { Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage /> }
                    <ApplicationDetailsFormSection
                        errors={errors}
                        mode={mode}
                        applicationData={applicationData}
                        operationalContext={operationalContext}
                        vendorOptions={vendorOptionsList}
                        claimSetOptions={claimsOptionsList}
                        onInputChange={onChangeInput}
                        onSelectVendor={onSelectVendor}
                        onSelectClaimSet={onSelectClaim} />
                    <Flex mt='32px' w='full'>
                        <LocalEducationAgenciesFormSection
                            name={getCurrentTenantOrgName(userProfile)}
                            description={getLocalEducationOrgId()}
                            selected={true}
                            mode={mode}
                            onToggleOrgId={() => onToggleOrgId()} />
                    </Flex>
                    <Flex mt={showApplicationAPIData()? "32px" : "0px"} w='full'>
                        <ApplicationAPIFormSection 
                            instance={instance}
                            mode={mode}
                            applicationClientData={applicationAuthData}
                            isRegeneratingCredentials={isRegeneratingCredentials}
                            onRegenerateCredentials={() => onRegenerateCredentials(editApplicationData? editApplicationData.applicationId : 0)} />
                    </Flex>
                </Flex>
        </Flex>} />
    )
}

export default ApplicationForm