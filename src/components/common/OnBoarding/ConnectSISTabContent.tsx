// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text
} from '@chakra-ui/react'
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
        fontFamily='Poppins'
        fontWeight='400'
        textAlign='justify'
        w='730px'
      >
        {setupWizard != true && <>
          Now that you’ve selected the instance(s) you’d like to activate, we need to connect them to your SIS. 
        </>}
        Select your District/Charter School’s SIS Provider below, then use the generated Key and Secret to complete the integration. Follow the steps provided in the Ed-Fi Tech Docs to complete the integration and come back here to refresh the connection status. If your District/Charter School uses another source provider for non-student data, follow the same steps to complete another integration.
      </Text>

      <Flex
        justifyContent='space-between'
        mt='32px'
        w='full'
      >
        <SISProviderForm 
          authenticationUrl={odsAuthenticationUrl? odsAuthenticationUrl : ''}
          connectionState={connectionState}
          edfiApplicationAuthData={edfiApplicationAuthData}
          handleChangeCredentials={handleChangeCredentials}
          handleChangeEndpoints={handleChangeEndpoints}
          handleChangeSISprovider={handleChangeSISprovider}
          handleRegenerateCredentials={handleRegenerateCredentials}
          handleRemoveProvider={handleRemoveProvider}
          hasSelectedProvider={hasSelectedProvider}
          isLoadingCredentials={isLoadingCredentials}
          resourcesUrl={odsResourcesUrl? odsResourcesUrl : ''}
          selectedProviderId={selectedProviderId}
          sisProvidersOptionList={sisProvidersOptionList}
        />

        <OptionalSISProviderForm
          authenticationUrl={odsAuthenticationUrl}
          connectionState={optionalConnectionState}
          edfiApplicationAuthData={optionaEdfiApplicationAuthData}
          handleChangeCredentials={handleChangeOptionalCredentials}
          handleChangeEndpoints={handleChangeEndpoints}
          handleRegenerateCredentials={handleRegenerateOptionalCredentials}
          handleRemoveProvider={handleRemoveOptionalProvider}
          hasSelectedProvider={hasSelectedOptionalProvider}
          isLoadingCredentials={isLoadingOptionalCredentials}
          optionalSISSources={optionalSISSources}
          resourcesUrl={odsResourcesUrl}
          selectedOptionalProviderId={selectedOptionalProviderId}
          showOptionalForm={showOptionalForm}
          sisProvidersOptionList={sisProvidersOptionList}
          source={optionalSource}
          onChangeOptionalProvider={onChangeOptionalProvider}
          onChangeOptionalSource={onChangeOptionalSource}
          onShowOptionalForm={onShowOptionalForm}
        />
      </Flex>
    </OnBoardingTabContentWrapper>
  )
}

export default ConnectSISTabContent