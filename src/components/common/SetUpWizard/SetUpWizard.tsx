import { CheckIcon } from "@chakra-ui/icons"
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useState } from "react"
import OnBoardingConnectSISContextProvider from "../../../context/onBoardingConnectSISContext"
import { SISProviderInfo } from "../../../core/sisProviders/SISProviders.types"
import useSetUpWizardStepsMetadata from "../../../hooks/setUpWizard/useSetUpWizardStepsMetadata"
import ConnectSISTabContent from "../OnBoarding/ConnectSISTabContent"
import OnBoardingTabsWrapper from "../OnBoarding/OnBoardingTabsWrapper"
import ReviewDataTabContent from "../OnBoarding/ReviewDataTabContent"
import SetUpWizardFinalizeTabContent from "./SetUpWizardFinalizeTabContent"
import { InstanceOnboarding } from "../../../core/setUpWizard/setUpWizard.types"
import { ODSInstance } from "../../../core/ODSInstance.types"
import useOdsInstanceYear from "../../../hooks/odsInstances/useOdsInstanceYear"

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
    const [connectedSISProvidersList, setConnectedSISProvidersList] = useState<SISProviderInfo[]>([])
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

        if (source === 'SIS' || includesRequiredProvider)
            onCompletedStep(0)
        else 
            onIncompletedStep(0)
    }

    const onRemoveOptionalProvider = () => {
        const nconnectedSISProvidersList = connectedSISProvidersList.filter(prov => {
            if (prov.source !== 'SIS')
                return false

            return true
        })

        setConnectedSISProvidersList(nconnectedSISProvidersList)
    }

    const onRemoveRequiredProvider = () => {
        const nconnectedSISProvidersList = connectedSISProvidersList.filter(prov => {
            if (prov.source == "SIS")
                return false

            return true
        })

        setConnectedSISProvidersList(nconnectedSISProvidersList)
    }

    const onUnselectSISProvider = (sisProviderType: "required" | "optional") => {
        if (sisProviderType === 'required') {
            onRemoveRequiredProvider()
            onIncompletedStep(0)
        }
        else 
            onRemoveOptionalProvider()
    } 

    const isDisabledTab = (index: number): boolean => {
        if (currentStepIndex === index)
            return false

        if (index === lastInProgress)
            return false

        if (index > completedSteps - 1)
            return true 

        return false
    }

    return (
        <Tabs isLazy index={currentStepIndex} onChange={(index) => onTabChange(index)} variant='enclosed' w='full'>
            <TabList justifyContent='space-between' w='480px'>
                {setUpWizardStepsMetadata.tabsData.map((step, index) => 
                    <Tab 
                        key={index}
                        fontFamily='Open sans'
                        borderRadius='0'
                        color='white'
                        isDisabled={isDisabledTab(index)}
                        fontWeight='700'
                        fontSize='14px'
                        lineHeight='28px'
                        _selected={{ color: 'blue.600', bg: 'white' }}
                        padding='8px 8px'
                        h='54px' 
                        w='auto'>
                            {setupWizardData && setupWizardData.steps[index].status === 'Completed' ?
                                <Flex alignItems='center'>
                                    {step.tabName}
                                    <CheckIcon 
                                        color='blue.500' 
                                        borderRadius='full'
                                        bg='blue.100'
                                        ml='10px'
                                        padding='2px'
                                        h='14px'
                                        w='14px'
                                        aria-hidden="true" 
                                        focusable="false" />
                                </Flex>
                            : step.tabName}
                        </Tab>
                )}
            </TabList>
            <TabPanels padding='0'>
                <OnBoardingConnectSISContextProvider
                    schoolYear={getInstanceYear(instance) ?? 0}
                    onSelectSISProvider={onSelectSISProvider}
                    onUnselectSISProvider={onUnselectSISProvider}>
                        <TabPanel padding='0'>
                            <OnBoardingTabsWrapper
                                stepName={setUpWizardStepsMetadata.tabsData[0].contentName}
                                currentStep={1}
                                lastStep={lastStep}
                                onNext={onNext}
                                onPrev={onPrev}
                                canNext={canNext}
                                canPrev={canPrev}>
                                    <ConnectSISTabContent 
                                        odsAuthenticationUrl={instance.authenticationUrl}
                                        odsResourcesUrl={instance.resourcesUrl}
                                        setupWizard={true} />
                            </OnBoardingTabsWrapper>
                        </TabPanel>
                </OnBoardingConnectSISContextProvider>
                <TabPanel padding='0'>
                    <OnBoardingTabsWrapper
                        stepName={setUpWizardStepsMetadata.tabsData[1].contentName}
                        currentStep={2}
                        lastStep={lastStep}
                        onNext={onNext}
                        onPrev={onPrev}
                        canNext={canNext}
                        canPrev={canPrev}>
                            <ReviewDataTabContent
                                setupWizard={true} />
                    </OnBoardingTabsWrapper>
                </TabPanel>
                <TabPanel padding='0'>
                    <OnBoardingTabsWrapper
                        stepName={setUpWizardStepsMetadata.tabsData[2].contentName}
                        currentStep={3}
                        lastStep={lastStep}
                        onNext={onNext}
                        onPrev={onPrev}
                        canNext={canNext}
                        canPrev={canPrev}>
                            <SetUpWizardFinalizeTabContent 
                                instance={instance}
                                connectedSISProvidersList={connectedSISProvidersList} />
                    </OnBoardingTabsWrapper>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default SetUpWizard