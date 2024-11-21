import { Flex } from '@chakra-ui/react'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'
import useApplicationForm from '../../../hooks/adminActions/edfi/useApplicationForm'
import {
  CompleteFormErrorMessage, UserProfile, UserProfileContext 
} from '@edfi/admin-console-shared-sdk'
import ApplicationAPIFormSection from './ApplicationAPIFormSection'
import ApplicationDetailsFormSection from './ApplicationDetailsFormSection'
import LocalEducationAgenciesFormSection from './LocalEducationAgenciesFormSection'
import { useContext } from 'react'
import useTenantInfo from '../../../hooks/useTenantInfo'
import EdFiModalForm from './EdFiModalForm'
import { ODSInstance } from '../../../core/ODSInstance.types'

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

      if (tenant) {
        return tenant.organizationName
      }

      return 'Loading...'
    }

    return 'Loading...'
  }

  const showApplicationAPIData = () => applicationAuthData.key && applicationAuthData.secret

  const getLocalEducationOrgId = () => {
    const currentTenant = getCurrentTenant()

    if (currentTenant) {
      return currentTenant.organizationIdentifier
    }

    return '...'
  }

  return (
    <EdFiModalForm
      content={<Flex w='full'>
        <Flex
          flexDir='column'
          w='full'
        >
          { Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage /> }

          <ApplicationDetailsFormSection
            applicationData={applicationData}
            claimSetOptions={claimsOptionsList}
            errors={errors}
            mode={mode}
            operationalContext={operationalContext}
            vendorOptions={vendorOptionsList}
            onInputChange={onChangeInput}
            onSelectClaimSet={onSelectClaim}
            onSelectVendor={onSelectVendor}
          />

          <Flex
            mt='32px'
            w='full'
          >
            <LocalEducationAgenciesFormSection
              description={getLocalEducationOrgId()}
              mode={mode}
              name={getCurrentTenantOrgName(userProfile)}
              selected={true}
              onToggleOrgId={() => onToggleOrgId()}
            />
          </Flex>

          <Flex
            mt={showApplicationAPIData()? '32px' : '0px'}
            w='full'
          >
            <ApplicationAPIFormSection 
              applicationClientData={applicationAuthData}
              instance={instance}
              isRegeneratingCredentials={isRegeneratingCredentials}
              mode={mode}
              onRegenerateCredentials={() => onRegenerateCredentials(editApplicationData? editApplicationData.applicationId : 0)}
            />
          </Flex>
        </Flex>
      </Flex>}
      actionText="save"
      headerText={mode === 'add'? 'Add Application' : 'Edit Application'}
      isSaving={isSaving}
      onClose={onFinishSave}
      onSave={onSave}
    />
  )
}

export default ApplicationForm