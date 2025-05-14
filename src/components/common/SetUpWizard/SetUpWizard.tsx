// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdCheckCircle } from 'react-icons/md'
import {
  Flex, Tab, TabList, TabPanel, TabPanels, Tabs
} from '@chakra-ui/react'
import { useState } from 'react'
import OnBoardingConnectSISContextProvider from '../../../context/onBoardingConnectSISContext'
import { ODSInstance } from '../../../core/ODSInstance.types'
import { InstanceOnboarding } from '../../../core/setUpWizard/setUpWizard.types'
import { SISProviderInfo } from '../../../core/sisProviders/SISProviders.types'
import useOdsInstanceYear from '../../../hooks/odsInstances/useOdsInstanceYear'
import useSetUpWizardStepsMetadata from '../../../hooks/setUpWizard/useSetUpWizardStepsMetadata'
import ConnectSISTabContent from '../OnBoarding/ConnectSISTabContent'
import OnBoardingTabsWrapper from '../OnBoarding/OnBoardingTabsWrapper'
import ReviewDataTabContent from '../OnBoarding/ReviewDataTabContent'
import SetUpWizardFinalizeTabContent from './SetUpWizardFinalizeTabContent'

interface SetUpWizardProps {
    instance: ODSInstance
    setupWizardData: InstanceOnboarding | null
    completedSteps: number
    currentStepIndex: number 
    lastInProgress: number
    lastStep: number 
    canNext: boolean 
    canPrev: boolean 
    onCompletedStep: (stepIndex: number) => void
    onIncompletedStep: (stepIndex: number) => void
    onTabChange: (index: number) => void
    onPrev: () => void 
    onNext: () => void
}

const SetUpWizard = ({ instance, setupWizardData, completedSteps, lastInProgress, currentStepIndex, lastStep, canNext, canPrev, onTabChange, onCompletedStep, onIncompletedStep, onNext, onPrev }: SetUpWizardProps) => {
  const [ connectedSISProvidersList, setConnectedSISProvidersList ] = useState<SISProviderInfo[]>([])
  const { setUpWizardStepsMetadata } = useSetUpWizardStepsMetadata()
  const { getInstanceYear } = useOdsInstanceYear()

  const onSelectSISProvider = (sisprovider: string, source: string) => {
    const nconnectedSISProvidersList = connectedSISProvidersList.map(prov => prov)

    const nprovider: SISProviderInfo = { 
      name: sisprovider, 
      source,
      status: 'Connected' 
    }

    nconnectedSISProvidersList.push(nprovider)

    setConnectedSISProvidersList(nconnectedSISProvidersList)

    const includesRequiredProvider = connectedSISProvidersList.find(prov => prov.source === 'SIS')

    if (source === 'SIS' || includesRequiredProvider) {
      onCompletedStep(0)
    } else {
      onIncompletedStep(0)
    }
  }

  const onRemoveOptionalProvider = () => {
    const nconnectedSISProvidersList = connectedSISProvidersList.filter(prov => {
      if (prov.source !== 'SIS') {
        return false
      }

      return true
    })

    setConnectedSISProvidersList(nconnectedSISProvidersList)
  }

  const onRemoveRequiredProvider = () => {
    const nconnectedSISProvidersList = connectedSISProvidersList.filter(prov => {
      if (prov.source == 'SIS') {
        return false
      }

      return true
    })

    setConnectedSISProvidersList(nconnectedSISProvidersList)
  }

  const onUnselectSISProvider = (sisProviderType: 'required' | 'optional') => {
    if (sisProviderType === 'required') {
      onRemoveRequiredProvider()
      onIncompletedStep(0)
    } else {
      onRemoveOptionalProvider()
    }
  } 

  const isDisabledTab = (index: number): boolean => {
    if (currentStepIndex === index) {
      return false
    }

    if (index === lastInProgress) {
      return false
    }

    if (index > completedSteps - 1) {
      return true
    } 

    return false
  }

  return (
    <Tabs
      isLazy
      index={currentStepIndex}
      variant='enclosed'
      w='full'
      onChange={(index) => onTabChange(index)}
    >
      <TabList
        justifyContent='space-between'
        w='480px'
      >
        {setUpWizardStepsMetadata.tabsData.map((step, index) => 
          <Tab 
            key={index}
            _selected={{
              color: 'blue.600',
              bg: 'white' 
            }}
            borderRadius='0'
            color='white'
            fontFamily='Poppins'
            fontSize='14px'
            fontWeight='700'
            h='54px'
            isDisabled={isDisabledTab(index)}
            lineHeight='28px'
            padding='8px 8px' 
            w='auto'
          >
            {setupWizardData && setupWizardData.steps[index].status === 'Completed' ?
              <Flex alignItems='center'>
                {step.tabName}

                <MdCheckCircle 
                  aria-hidden="true" 
                  bg='blue.100'
                  borderRadius='full'
                  color='blue.500'
                  focusable="false"
                  h='14px'
                  ml='10px'
                  padding='2px' 
                  w='14px'
                />
              </Flex>
              : step.tabName}
          </Tab>)}
      </TabList>

      <TabPanels padding='0'>
        <OnBoardingConnectSISContextProvider
          schoolYear={getInstanceYear(instance) ?? 0}
          onSelectSISProvider={onSelectSISProvider}
          onUnselectSISProvider={onUnselectSISProvider}
        >
          <TabPanel padding='0'>
            <OnBoardingTabsWrapper
              canNext={canNext}
              canPrev={canPrev}
              currentStep={1}
              lastStep={lastStep}
              stepName={setUpWizardStepsMetadata.tabsData[0].contentName}
              onNext={onNext}
              onPrev={onPrev}
            >
              <ConnectSISTabContent 
                odsAuthenticationUrl={instance.authenticationUrl}
                odsResourcesUrl={instance.resourcesUrl}
                setupWizard={true}
              />
            </OnBoardingTabsWrapper>
          </TabPanel>
        </OnBoardingConnectSISContextProvider>

        <TabPanel padding='0'>
          <OnBoardingTabsWrapper
            canNext={canNext}
            canPrev={canPrev}
            currentStep={2}
            lastStep={lastStep}
            stepName={setUpWizardStepsMetadata.tabsData[1].contentName}
            onNext={onNext}
            onPrev={onPrev}
          >
            <ReviewDataTabContent setupWizard={true} />
          </OnBoardingTabsWrapper>
        </TabPanel>

        <TabPanel padding='0'>
          <OnBoardingTabsWrapper
            canNext={canNext}
            canPrev={canPrev}
            currentStep={3}
            lastStep={lastStep}
            stepName={setUpWizardStepsMetadata.tabsData[2].contentName}
            onNext={onNext}
            onPrev={onPrev}
          >
            <SetUpWizardFinalizeTabContent 
              connectedSISProvidersList={connectedSISProvidersList}
              instance={instance}
            />
          </OnBoardingTabsWrapper>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default SetUpWizard