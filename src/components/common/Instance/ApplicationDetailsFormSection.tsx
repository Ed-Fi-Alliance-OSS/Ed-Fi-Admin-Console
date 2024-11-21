import {
  Flex, Text, FormControl 
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { EdfiClaimSet } from '../../../core/Edfi/EdfiClaimsets'
import { EdfiVendor } from '../../../core/Edfi/EdfiVendors'
import { FormDataErrors } from '../../../core/validation/FormValidations.types'
import { CreateEdfiApplicationRequest } from '../../../services/AdminActions/Edfi/Applications/EdfiApplicationService.requests'
import {
  CustomFormLabel, CustomSelect, CustomInput 
} from '@edfi/admin-console-shared-sdk'

interface ApplicationDetailsFormSectionProps {
    applicationData: CreateEdfiApplicationRequest
    operationalContext: string
    claimSetOptions: EdfiClaimSet[]
    vendorOptions: EdfiVendor[]
    errors: FormDataErrors
    mode: 'add' | 'edit'
    onSelectClaimSet: (claimName: string) => void
    onSelectVendor: (vendorId: number) => void
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ApplicationDetailsFormSection = ({ applicationData, mode, errors, operationalContext, claimSetOptions, vendorOptions, onInputChange, onSelectClaimSet, onSelectVendor }: ApplicationDetailsFormSectionProps) => {
  const selectedClaimset = () => {
    console.log('claimset options', claimSetOptions)
    console.log('application data claimset', applicationData.claimSetName)

    const claimsetid = claimSetOptions.find(item => item.name === applicationData.claimSetName)?.id

    console.log('claimset id', claimsetid)

    return claimsetid
  }

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <Text fontWeight='700'>Application Details</Text>

      <Flex flexDir='column'>
        <FormControl mt='16px'>
          <CustomFormLabel
            htmlFor="applicationName" 
            text="Application Name"
          />

          <CustomInput 
            disabled={mode == 'edit'? true : false}
            error={errors && errors['applicationName'] && errors['applicationName'].message}
            id="applicationName"
            value={applicationData.applicationName} 
            onChange={onInputChange}
          />
        </FormControl>

        <FormControl mt='16px'>
          <CustomFormLabel
            htmlFor="vendor" 
            text="Vendor"
          />

          <CustomSelect 
            options={vendorOptions.map(option => ({
              text: option.company ?? '',
              value: option.vendorId ?? 0 
            }))}
            disabled={mode == 'edit'? true : false}
            error={errors && errors['vendor'] && errors['vendor'].message}
            id="vendor"
            value={applicationData.vendorId} 
            onChange={(e) => onSelectVendor(parseInt(e.target.value))}
          />
        </FormControl>

        <FormControl mt='16px'>
          <CustomFormLabel
            htmlFor="claimset" 
            text="Permissions"
          />

          <CustomSelect 
            options={claimSetOptions.map(option => ({
              text: option.name,
              value: option.name 
            }))}
            disabled={mode == 'edit'? true : false}
            error={errors && errors['claimset'] && errors['claimset'].message}
            id="claimset"
            value={applicationData.claimSetName}
            onChange={(e) => onSelectClaimSet(e.target.value)}
          />
        </FormControl>
      </Flex>
    </Flex>
  )
}

export default ApplicationDetailsFormSection