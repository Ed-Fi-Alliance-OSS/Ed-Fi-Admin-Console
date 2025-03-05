// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, FormControl 
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomSwitch, CustomInput 
} from '@edfi/admin-console-shared-sdk'
import DomainSelect from './DomainSelect'

const domains = [
  'edwire.com',
  'ewconsultant.net'
]

const TenantSettingsForm = () => {
  return (
    <form style={{
      display: 'flex',
      width: '100%' 
    }}
    >
      <Flex
        flexDir='column'
        w='full'
      >
        <FormControl>
          <CustomFormLabel 
            htmlFor="organizationName"
            text="Organization Name"
          />

          <CustomInput
            id='organizationName'
            value='Grand Bend ISD'
            onChange={() => null}
          />
        </FormControl>

        <Flex mt='16px'>
          <FormControl>
            <CustomFormLabel 
              htmlFor="organizationId"
              text="Organization ID"
            />

            <CustomInput
              id='organizationId'
              value='255901'
              onChange={() => null}
            />
          </FormControl>
        </Flex>

        <Flex mt='16px'>
          <FormControl>
            <CustomFormLabel 
              htmlFor="organizationType"
              text="Organization Type"
            />

            <CustomInput
              id='organizationType'
              value='LEA'
              onChange={() => null}
            />
          </FormControl>
        </Flex>

        <Flex mt='16px'>
          <FormControl>
            <CustomFormLabel 
              htmlFor="organizationType"
              text="Tenant ID"
            />

            <CustomInput
              id='organizationType'
              value='00000000-0000-0000-0000-000000000001'
              onChange={() => null}
            />
          </FormControl>
        </Flex>

        <Flex mt='16px'>
          <FormControl>
            <CustomFormLabel 
              htmlFor="state"
              text="State"
            />

            <CustomInput
              id='state'
              value='Tx'
              onChange={() => null}
            />
          </FormControl>
        </Flex>

        <Flex mt='16px'>
          <FormControl>
            <CustomFormLabel 
              htmlFor="isDemo"
              text="Is Demo"
            />

            <CustomSwitch
              id="toggleTenant"
              isChecked={false}
            />
          </FormControl>
        </Flex>

        <Flex mt='16px'>
          <FormControl>
            <CustomFormLabel 
              htmlFor="domains"
              text="Domains"
            />

            <DomainSelect domains={domains} />
          </FormControl>
        </Flex>

        <Flex mt='32px'>
          <Button 
            size='lg'
            variant='primaryBlue600'
            w='189px'
          >
            Save Edits
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}

export default TenantSettingsForm