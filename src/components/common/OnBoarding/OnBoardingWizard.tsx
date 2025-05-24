// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdCheck } from 'react-icons/md'
import {
  Flex, Tabs
} from '@chakra-ui/react'
import {
  useContext, useEffect, useState
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import OnBoardingConnectSISContextProvider from '../../../context/onBoardingConnectSISContext'
import {
  onBoardingWizardContext, OnBoardingWizardDataWrapper
} from '../../../context/onBoardingWizardContext'
import { ExtendedODSInstance } from '../../../core/ODSInstance.types'
import { SISProviderInfo } from '../../../core/sisProviders/SISProviders.types'
import { VerifiedDomainInfo } from '../../../core/verifyDomain/VerifyDomain.types'
import useVerifyDomain from '../../../hooks/adminActions/dns/useVerifyDomain'
import useTenant from '../../../hooks/adminActions/tenant/useTenant'
import useInvitationsList from '../../../hooks/adminActions/users/useInvitationsList'
import useEdFiConnectionForm from '../../../hooks/edfi/useEdFiConnectionForm'
import useOdsDefaultInstance from '../../../hooks/odsInstances/useOdsDefaultInstance'
import useOdsInstanceYear from '../../../hooks/odsInstances/useOdsInstanceYear'
import useSetUpWizardStepsMetadata from '../../../hooks/setUpWizard/useSetUpWizardStepsMetadata'
import useExternalODSData from '../../../hooks/useExternalODSData'
import useOnboardingWizardStepsData from '../../../hooks/useOnBoardingWizardStepsData'
import useOdsInstanceService from '../../../services/ODSInstances/OdsInstanceService'
import {
  CreateOdsInstanceOnboardingStepRequest, UpdateOdsInstanceOnboardingStepRequest
} from '../../../services/ODSInstances/OdsInstanceService.requests'
import ConnectSISTabContent from './ConnectSISTabContent'
import FinalizeTabContent from './FinalizeTabContent'
import InviteUsersTabContent from './InviteUser/InviteUsersTabContent'
import OnBoardingTabsWrapper from './OnBoardingTabsWrapper'
import SelectInstancesTabContent from './SelectInstancesTabContent'
import SelectSSOMethodTabContent from './SelectSSOMethodTabContent'

interface OnBoardingWizardProps {
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

const OnBoardingWizard = ({ completedSteps, lastInProgress, currentStepIndex, lastStep, canNext, canPrev, onTabChange, onCompletedStep, onIncompletedStep, onNext, onPrev }: OnBoardingWizardProps) => {
  const adminConfig = useContext(adminConsoleContext)
  const { onBoardingWizardData } = useContext(onBoardingWizardContext) as OnBoardingWizardDataWrapper
  const [ connectedSISProvidersList, setConnectedSISProvidersList ] = useState<SISProviderInfo[]>([])
  const [ verifiedDomainList, setVerifiedDomainList ] = useState<VerifiedDomainInfo[]>([])
  const { tenant, isAddingDomain, isRemovingDomain, onAddDomain, onRemoveDomain } = useTenant()

  const {
    domainsList,
    onVerifyDomain,
    isCheckingDomainStatus
  } = useVerifyDomain({ tenantDomains: tenant?.domains })

  const { invitationsList } = useInvitationsList()
  const { externalODS } = useExternalODSData()
  const { onboardingStepsData } = useOnboardingWizardStepsData()

  const { formData, 
    isSaving,
    verificationStatus,
    errors,
    onInputChange,
    onVerifyConnection,
    isDisabledVerification,
    isVerifying,
    onSave } = useEdFiConnectionForm({ 
    mode: 'Add', 
    inOnboarding: true 
  })

  const {
    defaultInstance,
    onRefreshDefaultInstance
  } = useOdsDefaultInstance()

  const {
    getInstanceYear
  } = useOdsInstanceYear()

  // console.log('connected sis providers', connectedSISProvidersList)

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
      onCompletedStep(4)
    } else {
      onIncompletedStep(4)
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
      onIncompletedStep(4)
    } else {
      onRemoveOptionalProvider()
    }
  } 

  const onSelectedVerifiedDomainInfo = (verifiedDomainsInfo: VerifiedDomainInfo[]) => {
    const hasVerifiedDomain = verifiedDomainsInfo.find(domain => domain.status === 'Verified')

    if (hasVerifiedDomain) {
      setVerifiedDomainList(verifiedDomainsInfo)
      onCompletedStep(2)
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

  const [ instancesCount, setInstancesCount ] = useState(0)
  const onUpdateInstancesCount = (count: number) => setInstancesCount(count)
  const [ showConfirmInstanceModal, setShowConfirmInstanceModal ] = useState(false)
  const onShowConfirmInstanceModal = () => setShowConfirmInstanceModal(true)
  const onClose = () => setShowConfirmInstanceModal(false)
  const [ selectedInstance, setSelectedInstance ] = useState<ExtendedODSInstance | null>(null)
  const onSelectInstance = (instance: ExtendedODSInstance) => setSelectedInstance({ ...instance })

  const {
    updateInstanceIsDefault,
    createInstanceOnboardingStep,
    updateInstanceOnboardingStep
  } = useOdsInstanceService()

  const [ settingAsDefault, setSettingAsDefault ] = useState(false)

  const onSetInstanceAsDefault = async () => {
    if (!adminConfig || !selectedInstance) {
      return
    } 

    const result = await updateInstanceIsDefault(adminConfig.actionParams, {
      tenantId: selectedInstance.tenantId,
      instanceId: selectedInstance.instanceId,
      isDefault: true,
      validate: false
    })
  }

  const { setUpWizardStepsMetadata } = useSetUpWizardStepsMetadata()

  const setupInitialOnBoardingState = async (instanceId: string) => {
    console.log('Setting initial setup wizard state...')

    if (!adminConfig) {
      return
    } 

    for (const step of setUpWizardStepsMetadata.stepsData) {
      console.log('creating step', step.index + 1, step.name)

      const request: CreateOdsInstanceOnboardingStepRequest = {
        instanceId,
        tenantId: adminConfig.actionParams.tenantId,
        number: step.index + 1,
        description: step.name,
        status: 'Completed'
      }

      await createInstanceOnboardingStep(adminConfig.actionParams, request)
    }
  }

  const updateInitialOnBoardingState = async (instanceId: string) => {
    console.log('Updating setup wizard state...')

    if (!adminConfig) {
      return
    } 

    for (const step of setUpWizardStepsMetadata.stepsData) {
      console.log('Updating step', step.index + 1, step.name)

      const request: UpdateOdsInstanceOnboardingStepRequest = {
        instanceId,
        tenantId: adminConfig.actionParams.tenantId,
        number: step.index + 1,
        status: 'Completed'
      }

      await updateInstanceOnboardingStep(adminConfig.actionParams, request)
    }
  }

  const onContinueFromInstancesStep = async () => {
    console.log('on continue from instances step')

    setSettingAsDefault(true)

    await onSetInstanceAsDefault()
    await onRefreshDefaultInstance()

    setSettingAsDefault(false)

    setShowConfirmInstanceModal(false)

    return onNext()
  }

  const onVariableStepNext = async () => {
    if (externalODS.isExternalODS) {
      await onSave()

      return onNext()
    }

    if (!selectedInstance) {
      return
    } 

    console.log('selected', selectedInstance)
    console.log('default instance', defaultInstance)

    if (instancesCount == 1 && selectedInstance) {
      return await onContinueFromInstancesStep()
    }

    onShowConfirmInstanceModal()
  }

  const onNextFromModal = async () => {
    console.log('on next from modal')

    if (!selectedInstance) {
      return
    } 
        
    await onContinueFromInstancesStep()
  }

  const onFinalize = async () => {
    if (defaultInstance && !defaultInstance.verificationStatus) {
      await setupInitialOnBoardingState(defaultInstance.instanceId)  
    } else if (defaultInstance && defaultInstance.verificationStatus && defaultInstance.verificationStatus.status != 'Completed') {
      await updateInitialOnBoardingState(defaultInstance.instanceId)
    }

    onNext()
  }

  useEffect(() => {
    console.log('Connection verification status', verificationStatus)
    if (verificationStatus === 'Connected') {
      onCompletedStep(3)
    }
  }, [ verificationStatus ])

  useEffect(() => {
    if (domainsList && domainsList.length > 0) {
      onSelectedVerifiedDomainInfo(domainsList.map(domainData => {
        if (!domainData) {
          return {
            lea: tenant?.organizationName as string,
            domain: 'Unknown',
            status: 'Unknown'
          }
        }

        const info: VerifiedDomainInfo = {
          lea: tenant?.organizationName as string,
          domain: domainData.name,
          status: domainData?.state ?? 'Unknown'
        }

        return info
      }))
    }
  }, [ domainsList ])

  if(!onboardingStepsData) {
    return 'loading...'
  }

  return (<>
    <Tabs.Root
      lazyMount
      index={currentStepIndex}
      defaultIndex={0}
      variant='enclosed'
      w='full'
      onChange={(index) => onTabChange(index)}
    >
      <Tabs.List justifyContent='start'>
        {onboardingStepsData.tabsData.map((step, index) => 
          <Tabs.Content
            key={index}
            _selected={{
              color: 'blue.600',
              bg: 'white' 
            }}
            borderRadius='0'
            color='white'
            flexGrow={1}
            fontFamily='Poppins'
            fontSize='14px'
            fontWeight='700'
            h='54px'
            disabled={isDisabledTab(index)}
            lineHeight='28px' 
            padding='8px 8px'
          >
            {onBoardingWizardData && onBoardingWizardData.steps && onBoardingWizardData.steps[index] &&  onBoardingWizardData.steps[index].status === 'Completed' ?
              <Flex alignItems='center'>
                {step.tabName}

                <MdCheck 
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
          </Tab.Content>)}
      </Tabs.List>

      

      <Tabs.Content padding='0'>
        <Tabs.Content padding='0'>
          <OnBoardingTabsWrapper
            canNext={canNext}
            canPrev={canPrev}
            currentStep={1}
            lastStep={lastStep}
            stepName={onboardingStepsData.tabsData[0].contentName}
            onNext={onNext}
            onPrev={onPrev}
          >
            <InviteUsersTabContent onCompleteStep={onCompletedStep} />
          </OnBoardingTabsWrapper>
        </Tabs.Content>

        <Tabs.Content padding='0'>
          <OnBoardingTabsWrapper
            canNext={canNext}
            canPrev={canPrev}
            currentStep={2}
            lastStep={lastStep}
            stepName={onboardingStepsData.tabsData[1].contentName}
            onNext={onVariableStepNext}
            onPrev={onPrev}
          >
            <SelectInstancesTabContent 
              selectedInstance={selectedInstance} 
              settingAsDefault={settingAsDefault}
              showConfirmInstanceModal={showConfirmInstanceModal}
              tableMode="Select" 
              onCloseModal={onClose}
              onContinue={onNextFromModal}
              onSelectInstance={onSelectInstance}
              onUpdateInstancesCount={onUpdateInstancesCount}
            />
          </OnBoardingTabsWrapper>
        </Tabs.Content>

        <OnBoardingConnectSISContextProvider
          schoolYear={defaultInstance? getInstanceYear(defaultInstance) : 0}
          onSelectSISProvider={onSelectSISProvider}
          onUnselectSISProvider={onUnselectSISProvider}
        >
          <Tabs.Content padding='0'>
            <OnBoardingTabsWrapper
              canNext={canNext}
              canPrev={canPrev}
              currentStep={3}
              lastStep={lastStep}
              stepName={onboardingStepsData.tabsData[2].contentName}
              onNext={onNext}
              onPrev={onPrev}
            >
              <ConnectSISTabContent
                odsAuthenticationUrl={defaultInstance? defaultInstance.authenticationUrl : ''}
                odsResourcesUrl={defaultInstance? defaultInstance.resourcesUrl : ''}
              />
            </OnBoardingTabsWrapper>
          </Tabs.Content>
        </OnBoardingConnectSISContextProvider> 

        <Tabs.Content padding='0'>
          <OnBoardingTabsWrapper
            canNext={canNext}
            canPrev={canPrev}
            currentStep={4}
            lastStep={lastStep}
            stepName={onboardingStepsData.tabsData[3].contentName}
            onNext={onNext}
            onPrev={onPrev}
          >
            <SelectSSOMethodTabContent />
          </OnBoardingTabsWrapper>
        </Tabs.Content>

        {/* <Tabs.Content padding='0'>
          <OnBoardingTabsWrapper
            canNext={canNext}
            canPrev={canPrev}
            currentStep={externalODS.isExternalODS? 5 : 6}
            lastStep={lastStep}
            stepName={externalODS.isExternalODS? onboardingStepsData.tabsData[4].contentName : onboardingStepsData.tabsData[5].contentName}
            onNext={onNext}
            onPrev={onPrev}
          >
            <ReviewDataTabContent />
          </OnBoardingTabsWrapper>
        </Tabs.Content> */}

        

        <Tabs.Content padding='0'>
          <OnBoardingTabsWrapper
            canNext={canNext}
            canPrev={canPrev}
            currentStep={5}
            lastStep={lastStep}
            stepName={onboardingStepsData.tabsData[4].contentName}
            onNext={onFinalize}
            onPrev={onPrev}
          >
            <FinalizeTabContent
              connectedODS={formData} 
              connectedSISProvidersList={connectedSISProvidersList}
              invitationsList={invitationsList}
              selectedInstance={defaultInstance as any}
              verificationStatus={verificationStatus}
              verifiedDomainList={verifiedDomainList}
              onSelectInstance={onSelectInstance}
            />
          </OnBoardingTabsWrapper>
        </Tabs.Content>
      </Tabs.Content>
    </Tabs.Root>
  </>
  )
}

export default OnBoardingWizard