// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, FormControl 
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomSelect, CustomInput 
} from '@edfi/admin-console-shared-sdk'
import APIClientSubscriptionsForm from './APIClientSubscriptionsForm'

const AddAPIClientFormContent = () => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <FormControl>
        <CustomFormLabel 
          htmlFor='clientName' 
          text='Client Name'
        />

        <CustomInput
          id="clientName"
          value=''
          onChange={() => null}
        />
      </FormControl>

      <Flex mt='24px'>
        <FormControl>
          <CustomFormLabel 
            htmlFor='expirtationDate' 
            text='Select Expiry Date for API Secret'
          />

          <CustomSelect
            options={[
              {
                value: 'Date Two',
                text: 'Date One' 
              }
            ]}
            value=''  
            onChange={() => null}
          />
        </FormControl>
      </Flex>

      <Flex
        justifyContent='space-between'
        mt='40px'
        w='full'
      >
        <APIClientSubscriptionsForm />
      </Flex>
    </Flex>
  )
}

export default AddAPIClientFormContent