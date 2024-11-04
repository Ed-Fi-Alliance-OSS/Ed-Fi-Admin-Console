import { Flex, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { onBoardingConnectSISContext } from '../../../context/onBoardingConnectSISContext'
import OnBoardingTabContentWrapper from './OnBoardingTabContentWrapper'
import OptionalSISProviderForm from './OptionalSISProviderForm'
import SISProviderForm from './SISProviderForm'

interface ConnectSISTabContentProps {
    setupWizard?: boolean
    odsAuthenticationUrl: string
    odsResourcesUrl: string
}

const ConnectSISTabContent = ({ odsAuthenticationUrl, odsResourcesUrl, setupWizard }: ConnectSISTabContentProps) => {
  const {
    sisProvidersOptionList,
    selectedProviderId,
    selectedOptionalProviderId,
    connectionState,
    optionalConnectionState,
    optionaEdfiApplicationAuthData,
    isLoadingOptionalCredentials,
    hasSelectedProvider,
    hasSelectedOptionalProvider,
    optionalSource,
    edfiApplicationAuthData,
    isLoadingCredentials,
    optionalSISSources,
    showOptionalForm,
    onShowOptionalForm,
    onChangeOptionalProvider,
    onChangeOptionalSource,
    handleRegenerateOptionalCredentials,
    handleChangeOptionalCredentials,
    handleChangeCredentials,
    handleChangeEndpoints,
    handleChangeSISprovider,
    handleRegenerateCredentials,
    handleRemoveProvider,
    handleRemoveOptionalProvider
  } = useContext(onBoardingConnectSISContext)

  return (
    <OnBoardingTabContentWrapper>
      <Text
        fontFamily='Open sans'
        textAlign='justify'
        fontWeight='400'
        w='730px'>
        {setupWizard != true && <>
                    Now that you’ve selected the instance(s) you’d like to activate, we need to connect them to your SIS. 
        </>}
                  Select your District/Charter School’s SIS Provider below, then use the generated Key and Secret to complete the integration. Follow the steps provided in the Ed-Fi Tech Docs to complete the integration and come back here to refresh the connection status. If your District/Charter School uses another source provider for non-student data, follow the same steps to complete another integration.
      </Text>
      <Flex justifyContent='space-between' mt='32px' w='full'>
        <SISProviderForm 
          authenticationUrl={odsAuthenticationUrl? odsAuthenticationUrl : ''}
          resourcesUrl={odsResourcesUrl? odsResourcesUrl : ''}
          sisProvidersOptionList={sisProvidersOptionList}
          selectedProviderId={selectedProviderId}
          connectionState={connectionState}
          hasSelectedProvider={hasSelectedProvider}
          edfiApplicationAuthData={edfiApplicationAuthData}
          isLoadingCredentials={isLoadingCredentials}
          handleChangeCredentials={handleChangeCredentials}
          handleChangeEndpoints={handleChangeEndpoints}
          handleChangeSISprovider={handleChangeSISprovider}
          handleRegenerateCredentials={handleRegenerateCredentials}
          handleRemoveProvider={handleRemoveProvider} />
        <OptionalSISProviderForm
          authenticationUrl={odsAuthenticationUrl}
          resourcesUrl={odsResourcesUrl}
          source={optionalSource}
          showOptionalForm={showOptionalForm}
          sisProvidersOptionList={sisProvidersOptionList}
          selectedOptionalProviderId={selectedOptionalProviderId}
          connectionState={optionalConnectionState}
          hasSelectedProvider={hasSelectedOptionalProvider}
          edfiApplicationAuthData={optionaEdfiApplicationAuthData}
          isLoadingCredentials={isLoadingOptionalCredentials}
          handleChangeCredentials={handleChangeOptionalCredentials}
          handleChangeEndpoints={handleChangeEndpoints}
          handleRegenerateCredentials={handleRegenerateOptionalCredentials}
          handleRemoveProvider={handleRemoveOptionalProvider}
          optionalSISSources={optionalSISSources}
          onShowOptionalForm={onShowOptionalForm}
          onChangeOptionalProvider={onChangeOptionalProvider}
          onChangeOptionalSource={onChangeOptionalSource} />
      </Flex>
    </OnBoardingTabContentWrapper>
  )
}

export default ConnectSISTabContent