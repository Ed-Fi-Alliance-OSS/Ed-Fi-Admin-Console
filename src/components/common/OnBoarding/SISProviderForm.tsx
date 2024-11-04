import { Flex, Text } from '@chakra-ui/react'
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
      borderRadius='4px'
      border='1px' 
      borderColor='gray.300' 
      padding='12px'
      flexDir='column' 
      h='730px'
      w='49%'>
      <Text
        color='blue.500'
        fontWeight='700'
        fontSize='20px'
        fontFamily='Poppins'>Required SIS Provider</Text>
      <Flex mt='8px'>
        <CustomFormLabel
          htmlFor="selectProvider"
          text="Select Provider" />
      </Flex>
      <Flex mt='5px'>
        <SISProviderConnectionField
          id="selectProvider"
          sisProviderOptions={sisProvidersOptionList}
          selectedProvider={selectedProviderId}
          hasSelectedProvider={hasSelectedProvider}
          connectionState={connectionState}
          onChangeSISProvider={handleChangeSISprovider}
          onRemoveProvider={handleRemoveProvider} />
      </Flex>
      <Flex bg='gray.300' my='24px' h='1px' w='full' />
      <Flex flexDir='column' mt='0px'>
        <Text
          fontSize='18px'
          fontWeight='700'
          fontFamily='Poppins'>Credentials</Text>
        <SISCredentialsField
          credentialsKey={edfiApplicationAuthData.key ?? ''}
          credentialsSecret={edfiApplicationAuthData.secret ?? ''}
          isLoadingCredentials={isLoadingCredentials}
          regenerateCredentialsDisabled={!hasSelectedProvider}
          onChangeCredentials={handleChangeCredentials}
          onRegenerateCredentials={handleRegenerateCredentials} />
        <Flex bg='gray.300' my='24px' h='1px' w='full' />
        <Text
          fontSize='18px'
          fontWeight='700'
          fontFamily='Poppins'>Endpoints</Text>
        <SISEndpointsField
          edfiAuthtenticationUrl={authenticationUrl}
          edfiResourcesUrl={resourcesUrl}
          onChangeEndpoints={handleChangeEndpoints} />
        <Flex bg='gray.300' my='24px' h='1px' w='full' />
        <Text
          fontSize='18px'
          fontWeight='700'
          fontFamily='Poppins'>Steps to Connect</Text>
        <Flex mt='16px'>
          <Text 
            fontFamily='Open sans'
            size='sm'>
                                Find your SIS Provider in the Ed-Fi Tech Docs and follow the “Enablement  & Configuration Guide” in the “Notes & Support Resources” column for the full steps to connect.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SISProviderForm