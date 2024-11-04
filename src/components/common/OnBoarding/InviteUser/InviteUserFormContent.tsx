import { InfoIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'
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
        bg='orange.100' 
        alignItems='center'
        padding='16px 12px' 
        mb='24px'
        w='full'>
        <InfoIcon color='orange.500'    
          aria-hidden="true" 
          focusable="false"  />
        <Flex flexDir='column' ml='12px'>
          <Text
            fontFamily='Poppins'
            fontWeight='600'
            fontSize='16px'>NOTE</Text>
          <Text
            fontFamily='Open sans'
            fontWeight='400'
            fontSize='16px'>
                            Any users you add here will receive admin privileges for your District/Charter School. Be sure to only invite users who you trust to keep information secure. You’ll be able to invite other users with different levels of access later.
          </Text>
        </Flex>
      </Flex>
      <AddAppUserFormContent 
        userData={userData}
        mode='Invite Admin'
        roleOptions={[]}
        subscriptionOptionsList={[]}
        errors={errors}
        onToggleIsAdmin={() => null}
        hasTriedSubmit={hasTriedSubmit}
        onRoleSelect={() => null}
        onSelectApplicationRoleForUser={() => null}
        onSubscriptionToggle={() => null}
        onInputChange={onInputChange}
        onChangeMode={() => null} />
    </Flex>
  )
}

export default InviteUserFormContent