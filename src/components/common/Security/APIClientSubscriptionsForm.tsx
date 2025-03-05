// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import {
  CustomSelect, CustomSwitch
} from '@edfi/admin-console-shared-sdk'

const subscriptions = [
  'Data Sync',
  'Analytics',
  'Ed-Fi Admin',
  'RTI',
  'Validations'
]

const APIClientSubscriptionsForm = () => {
  return (
    <Flex 
      flexDir='column' 
      w='full'
    >
      {subscriptions.map((option, index) => 
        <Flex 
          key={index}
          _notFirst={{ mt: '15px' }}
          alignItems='center'
          border='1px'
          borderColor='gray.300'
          borderRadius='4px'
          justifyContent='space-between'
          padding='12px 10px'
          w='full'
        >
          <Flex alignItems='center'>
            <CustomSwitch 
              id="apiClient"
              isChecked={option === 'Data Sync'? true : false}
            />

            <Text
              color='blue.600'
              fontFamily='Poppins'
              fontWeight='700'
              ml='15px'
              size='sm'
            >
              {option}
            </Text>
          </Flex>  

          {option === 'Data Sync' && 
          <Flex>
            <CustomSelect
              options={[
                {
                  text: 'Data Sync.U...',
                  value: 'Data Sync.U...' 
                }
              ]}
              value='Data Sync.U...'
              onChange={() => null}
            />
          </Flex>}
        </Flex>)}
    </Flex>
  )
}   

export default APIClientSubscriptionsForm