// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Spinner, Text
} from '@chakra-ui/react'
import {
  CustomSelect, CustomSwitch
} from '@edfi/admin-console-shared-sdk'
import { SubscriptionOption } from '../../../hooks/adminActions/users/useCreateUserForm.types'

interface AppUserSubscriptionsFormProps {
    subscriptionsList: SubscriptionOption[]
    isFetchingProfile: boolean 
    isImplicit: (applicationId: string) => boolean
    onSubscriptionToggle: (applicationId: string, subscriptionId: string) => void
    onSelectRoleForUser: (subscriptionId: string, role: string) => void
}

const AppUserSubscriptionsForm = ({ subscriptionsList, isImplicit, isFetchingProfile, onSubscriptionToggle, onSelectRoleForUser }: AppUserSubscriptionsFormProps) => {
  const selectRoleOptions = (subscription: SubscriptionOption) => {
    if (subscription.roles) {
      const roles = subscription.roles.filter(option => option.isAvailableForTenant).map(option => ({
        value: option.roleName,
        text: option.roleName.split('.')[1] 
      }))

      roles.unshift({
        value: '',
        text: 'Select' 
      })

      return roles
    }

    return []
  }

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      { isFetchingProfile && <Flex
        justifyContent='center'
        mt='12px'
        w='full'
      >
        <Spinner
          color='blue.600'
          fontSize='xl'
        /> 
      </Flex>}

      { !isFetchingProfile && <Flex 
        flexDir='column' 
        padding='10px'
        w='full'
      >
        {subscriptionsList.map((subscription, index) => 
          <Flex 
            key={index}
            _notFirst={{ mt: '16px' }}
            alignItems='center'
            border='1px'
            borderColor='gray.300'
            borderRadius='4px'
            padding='8px'
            w='full'
          >
            <label
              hidden={true}
              htmlFor=''
            >
            </label>

            <CustomSwitch 
              id={subscription.applicationName}
              isChecked={subscription.checked} 
              isDisabled={isImplicit(subscription.applicationId)}
              onCheck={() => onSubscriptionToggle(subscription.applicationId, subscription.subscriptionId)}
            />

            <Flex
              flexDir='column'
              ml='16px'
            >
              <Flex w='full'>
                <Text
                  color='blue.600'
                  fontFamily='Poppins'
                  fontSize='sm'
                  fontWeight='700'
                  lineHeight='22px'
                >{subscription.applicationName}
                </Text>

                { isImplicit(subscription.applicationId) && <Text 
                  border="1px"
                  borderColor='blue.600'
                  borderRadius='4px'
                  color='blue.900'
                  fontFamily='Poppins'
                  fontSize='12px'
                  fontWeight='bold'
                  ml='6px'
                  padding='1px 5px'
                >
                  Implicit
                </Text>}
              </Flex>

              <Text
                color='gray.700'
                fontFamily='Poppins'
                fontSize='xs'
                fontWeight='400'
                lineHeight='16px'
              >{`${subscription.assignedLicenses} out of ${subscription.numberOfLicenses === -1? 'Unlimited' : subscription.numberOfLicenses} assigned`}
              </Text>
            </Flex>

            {subscription.checked && subscription.roles && <Flex  
              ml='auto'
              w='133px'
            >
              <CustomSelect 
                disabled={isImplicit(subscription.applicationId)}
                id={`${subscription.applicationName}-roles`}
                options={selectRoleOptions(subscription)}
                value={subscription.selectedRole}
                onChange={e => onSelectRoleForUser(subscription.subscriptionId, e.target.value)}
              />
            </Flex>}
          </Flex>)}
      </Flex> }
    </Flex>
  )
}   

export default AppUserSubscriptionsForm