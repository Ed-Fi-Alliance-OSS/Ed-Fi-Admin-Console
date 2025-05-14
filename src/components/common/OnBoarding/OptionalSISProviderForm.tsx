// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdAdd } from 'react-icons/md'
import {
  Button, Flex, FormControl, Text
} from '@chakra-ui/react'
import {
  CustomFormLabel, CustomSelect
} from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'
import { EdfiApplicationAuthData } from '../../../core/Edfi/EdfiApplications'
import { SISProviderConnectionState } from '../../../core/sisProviders/SISProviders.types'
import { SISProvidersOption } from '../../../hooks/adminActions/edfi/useSISProvidersForm.types'
import SISCredentialsField from './SISCredentialsField'
import SISEndpointsField from './SISEndpointsField'
import SISProviderConnectionField from './SISProviderConnectionField'

interface OptionalSISProviderFormProps {
    authenticationUrl: string
    resourcesUrl: string
    selectedOptionalProviderId: string,
    source: string,
    optionalSISSources: any[]
    sisProvidersOptionList: SISProvidersOption[]
    connectionState: SISProviderConnectionState
    hasSelectedProvider: boolean
    edfiApplicationAuthData: EdfiApplicationAuthData
    isLoadingCredentials: boolean
    showOptionalForm: boolean
    onShowOptionalForm: () => void
    onChangeOptionalSource: (e: ChangeEvent<HTMLSelectElement>) => void
    onChangeOptionalProvider: (e: ChangeEvent<HTMLSelectElement>) => void
    handleChangeCredentials: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangeEndpoints: () => void
    handleRegenerateCredentials: () => Promise<void>
    handleRemoveProvider: () => void
}

const OptionalSISProviderForm = ({ authenticationUrl, 
  resourcesUrl,
  sisProvidersOptionList,
  connectionState,
  hasSelectedProvider,
  edfiApplicationAuthData,
  isLoadingCredentials,
  selectedOptionalProviderId,
  source,
  optionalSISSources,
  showOptionalForm,
  onShowOptionalForm,
  onChangeOptionalProvider,
  onChangeOptionalSource,
  handleChangeCredentials,
  handleChangeEndpoints,
  handleRegenerateCredentials,
  handleRemoveProvider }: OptionalSISProviderFormProps) => {

  return (
    <Flex  
      border='1px'
      borderColor='gray.300' 
      borderRadius='4px' 
      flexDir='column'
      h={showOptionalForm? 'auto' : '160px'} 
      padding='12px'
      w='49%'
    >
      <Text
        color='blue.500'
        fontFamily='Poppins'
        fontSize='20px'
        fontWeight='700'
      >Optional: Another Source Provider
      </Text>

      {!showOptionalForm? <Flex flexDir='column'>
        <Text
          fontFamily='Poppins'
          fontSize='14px'
          fontWeight='400'
          mt='8px'
        >
          If your District or Charter School uses another source provider (e.g., HR, Finance, Staff), complete another connection flow.
        </Text>

        <Button
          maxW='80px'
          minW='80px'
          mt='12px'
          size='sm'
          variant='primaryBlue600'
          onClick={onShowOptionalForm}
        >
          <Flex>
            <MdAdd />
          </Flex>

          <Text
            color='white'
            ml='5px'
          >Add
          </Text>
        </Button>
      </Flex> : <>
        <Flex mt='8px'>
          <CustomFormLabel
            htmlFor="selectOptionalProvider"
            text="Select Provider"
          />
        </Flex>

        <Flex mt='5px'>
          <SISProviderConnectionField
            connectionState={connectionState}
            hasSelectedProvider={hasSelectedProvider}
            id="selectOptionalProvider"
            providerFunction={source}
            selectedProvider={selectedOptionalProviderId}
            sisProviderOptions={sisProvidersOptionList}
            onChangeSISProvider={onChangeOptionalProvider}
            onRemoveProvider={handleRemoveProvider}
          />
        </Flex> 

        <Flex mt={!hasSelectedProvider? '12px' : '0'}>
          { !hasSelectedProvider && <FormControl w='300px'>
            <CustomFormLabel 
              htmlFor="providerFunction"
              text="Source Provider Function"
            />

            <CustomSelect
              id="providerFunction"
              options={optionalSISSources}
              value={source}
              onChange={onChangeOptionalSource}
            />
          </FormControl> }
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
              size='sm'
            >
              For help connecting, reach out to your source provider's support services or read through their provided documentation.
            </Text>
          </Flex>
        </Flex>
      </>}
    </Flex>
  )
}

export default OptionalSISProviderForm