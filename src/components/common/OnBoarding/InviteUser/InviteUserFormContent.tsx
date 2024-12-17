import { InfoIcon } from '@chakra-ui/icons'
import {
  Flex, Text
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { FormDataErrors } from '../../../../core/validation/FormValidations.types'
import { CreateUserFormData } from '../../../../hooks/adminActions/users/useCreateUserForm.types'
import AddAppUserFormContent from '../../User/AddAppUserFormContent'

interface InviteUserFormContentProps {
    userData: CreateUserFormData
    hasTriedSubmit: boolean 
    errors: FormDataErrors
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InviteUserFormContent = ({ userData, hasTriedSubmit, errors, onInputChange }: InviteUserFormContentProps) => {
  return (
    <Flex flexDir='column'>
      <Flex
        alignItems='center' 
        bg='orange.100'
        mb='24px' 
        padding='16px 12px'
        w='full'
      >
        <InfoIcon
          aria-hidden="true"    
          color='orange.500' 
          focusable="false"
        />

        <Flex
          flexDir='column'
          ml='12px'
        >
          <Text
            fontFamily='Poppins'
            fontSize='16px'
            fontWeight='600'
          >NOTE
          </Text>

          <Text
            fontFamily='Poppins'
            fontSize='16px'
            fontWeight='400'
          >
            Any users you add here will receive admin privileges for your District/Charter School. Be sure to only invite users who you trust to keep information secure. You’ll be able to invite other users with different levels of access later.
          </Text>
        </Flex>
      </Flex>

      <AddAppUserFormContent 
        errors={errors}
        hasTriedSubmit={hasTriedSubmit}
        mode='Invite Admin'
        roleOptions={[]}
        subscriptionOptionsList={[]}
        userData={userData}
        onChangeMode={() => null}
        onInputChange={onInputChange}
        onRoleSelect={() => null}
        onSelectApplicationRoleForUser={() => null}
        onSubscriptionToggle={() => null}
        onToggleIsAdmin={() => null}
      />
    </Flex>
  )
}

export default InviteUserFormContent