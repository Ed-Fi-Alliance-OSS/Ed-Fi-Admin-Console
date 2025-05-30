// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
import { CustomFormLabel } from '@edfi/admin-console-shared-sdk'
import { EdfiApplicationAuthData } from '../../../core/Edfi/EdfiApplications'
import { SISProviderConnectionState } from '../../../core/sisProviders/SISProviders.types'
import { SISProvidersOption } from '../../../hooks/adminActions/edfi/useSISProvidersForm.types'
import SISCredentialsField from './SISCredentialsField'
import SISEndpointsField from './SISEndpointsField'
import SISProviderConnectionField from './SISProviderConnectionField'

interface SISProviderFormProps {
    authenticationUrl: string
    resourcesUrl: string
    sisProvidersOptionList: SISProvidersOption[]
    selectedProviderId: string
    connectionState: SISProviderConnectionState
    hasSelectedProvider: boolean
    edfiApplicationAuthData: EdfiApplicationAuthData
    isLoadingCredentials: boolean
    handleChangeCredentials: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeEndpoints: () => void
    handleChangeSISprovider: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void>
    handleRegenerateCredentials: () => Promise<void>
    handleRemoveProvider: () => void
}

const SISProviderForm = ({ sisProvidersOptionList, selectedProviderId, connectionState, hasSelectedProvider, edfiApplicationAuthData, handleChangeCredentials, handleChangeEndpoints, 
  handleChangeSISprovider, handleRegenerateCredentials, handleRemoveProvider, isLoadingCredentials, authenticationUrl, resourcesUrl }: SISProviderFormProps) => {

  return (
    <Flex 
      border='1px'
      borderColor='gray.300' 
      borderRadius='4px' 
      flexDir='column'
      h='730px' 
      padding='12px'
      w='49%'
    >
      <Text
        color='blue.500'
        fontFamily='Poppins'
        fontSize='20px'
        fontWeight='700'
      >Required SIS Provider
      </Text>

      <Flex mt='8px'>
        <CustomFormLabel
          htmlFor="selectProvider"
          text="Select Provider"
        />
      </Flex>

      <Flex mt='5px'>
        <SISProviderConnectionField
          connectionState={connectionState}
          hasSelectedProvider={hasSelectedProvider}
          id="selectProvider"
          selectedProvider={selectedProviderId}
          sisProviderOptions={sisProvidersOptionList}
          onChangeSISProvider={handleChangeSISprovider}
          onRemoveProvider={handleRemoveProvider}
        />
      </Flex>

      <Flex
        bg='gray.300'
        h='1px'
        my='24px'
        w='full'
      />

      <Flex
        flexDir='column'
        mt='0px'
      >
        <Text
          fontFamily='Poppins'
          fontSize='18px'
          fontWeight='700'
        >Credentials
        </Text>

        <SISCredentialsField
          credentialsKey={edfiApplicationAuthData.key ?? ''}
          credentialsSecret={edfiApplicationAuthData.secret ?? ''}
          isLoadingCredentials={isLoadingCredentials}
          regenerateCredentialsDisabled={!hasSelectedProvider}
          onChangeCredentials={handleChangeCredentials}
          onRegenerateCredentials={handleRegenerateCredentials}
        />

        <Flex
          bg='gray.300'
          h='1px'
          my='24px'
          w='full'
        />

        <Text
          fontFamily='Poppins'
          fontSize='18px'
          fontWeight='700'
        >Endpoints
        </Text>

        <SISEndpointsField
          edfiAuthtenticationUrl={authenticationUrl}
          edfiResourcesUrl={resourcesUrl}
          onChangeEndpoints={handleChangeEndpoints}
        />

        <Flex
          bg='gray.300'
          h='1px'
          my='24px'
          w='full'
        />

        <Text
          fontFamily='Poppins'
          fontSize='18px'
          fontWeight='700'
        >Steps to Connect
        </Text>

        <Flex mt='16px'>
          <Text 
            fontFamily='Poppins'
            fontSize='sm'
          >
            Find your SIS Provider in the Ed-Fi Tech Docs and follow the “Enablement  & Configuration Guide” in the “Notes & Support Resources” column for the full steps to connect.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SISProviderForm