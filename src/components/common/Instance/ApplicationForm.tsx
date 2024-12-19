import { Flex } from '@chakra-ui/react'
import {
  CompleteFormErrorMessage, UserProfile, UserProfileContext
} from '@edfi/admin-console-shared-sdk'
import {
  useContext, useEffect
} from 'react'
import { EdfiApplication } from '../../../core/Edfi/EdfiApplications'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useApplicationForm from '../../../hooks/adminActions/edfi/useApplicationForm'
import useTenantInfo from '../../../hooks/useTenantInfo'
import MultiInput from '../../MultiInput'
import ApplicationAPIFormSection from './ApplicationAPIFormSection'
import ApplicationDetailsFormSection from './ApplicationDetailsFormSection'
import EdFiModalForm from './EdFiModalForm'

interface ApplicationFormProps {
    instance: ODSInstance | null
    mode: 'add' | 'edit'
    editApplicationData?: EdfiApplication
    onFinishSave: () => void
}

const ApplicationForm = ({ instance, mode, editApplicationData, onFinishSave }: ApplicationFormProps) => {
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
    onSelectClaim,
    onSelectVendor,
    onSave,
    transformText,
    setEdorgs,
    edOrgs
  } = useApplicationForm({ 
    instanceId: instance?.id ?? 0,
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
        return tenant.document.name
      }

      return 'Loading...'
    }

    return 'Loading...'
  }

  const showApplicationAPIData = () => applicationAuthData.key && applicationAuthData.secret

  const getLocalEducationOrgId = () => {
    const currentTenant = getCurrentTenant()

    if (currentTenant) {
      return `Id: ${currentTenant.tenantId}`
    }

    return '...'
  }

  useEffect(() => {
    if(applicationData.educationOrganizationIds){
      console.log('setting edorgs', applicationData.educationOrganizationIds)
      setEdorgs(applicationData.educationOrganizationIds)
    }
  }, [ applicationData ])

  // setEdorgs
  function isNumberKey(evt) {
    if(evt.target.value) {
      evt.target.value = evt.target.value.replace(/[^0-9]/g, '')
    }
    // var charCode = (evt.which) ? evt.which : evt.keyCode

    // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //   return false 
    // }

    // return true
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
            <MultiInput
              filterInput={isNumberKey}
              label='EdOrgs'
              transformText={transformText}
              values={edOrgs}
              onChange={setEdorgs}
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
              onRegenerateCredentials={() => onRegenerateCredentials(editApplicationData? editApplicationData.id : 0)}
            />
          </Flex>
        </Flex>
      </Flex>}
      actionText="Save"
      headerText={mode === 'add'? 'Add Application' : 'Edit Application'}
      isSaving={isSaving}
      onClose={onFinishSave}
      onSave={onSave}
    />
  )
}

export default ApplicationForm