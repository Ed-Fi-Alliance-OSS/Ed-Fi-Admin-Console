import { useEffect, useState } from "react"
import { StepData } from "../core/onBoardingWizard/onBoardingWizard.types"
import useExternalODSData from "./useExternalODSData"

interface ITabData {
    tabName: string 
    contentName: string 
}

interface IOnBoardingWizardStepData {
    tabsData: ITabData[]
    stepsData: StepData[]
}

const OnBoardingWizardTabsData = [
    { tabName: 'Invite Users', contentName: 'Invite Technical Admin Users' },
    { tabName: 'Complete Training', contentName: 'Complete Training' },
    { tabName: 'Verify Domain', contentName: 'Verify Domain' },
    { tabName: 'Select School Year', contentName: 'Select School Year' },
    { tabName: 'Connect Sources', contentName: 'Connect Your Source Providers' },
    { tabName: 'Review Data', contentName: 'Review Data' },
    { tabName: 'Select SSO Methods', contentName: 'Select Single Sign-On Methods' },
    { tabName: 'Finalize', contentName: 'Review and Finalize' }
]

const OnBoardingWizardStepsList: StepData[] = [
    { 
        name: OnBoardingWizardTabsData[0].contentName, 
        index: 0, 
        description: 'Give other users within your District/Charter School Admin Access. You’ll need their email addresses.'
    },
    { 
        name: 'Complete Training', 
        index: 1, 
        description: 'Review a short training module on best practices for data management.'
    },
    { 
        name: OnBoardingWizardTabsData[2].contentName, 
        index: 2, 
        description: 'Confirm that you own the domain associated with your District/Charter School. You’ll need access to DNS records to complete this step.'
    },
    { 
        name: OnBoardingWizardTabsData[3].contentName, 
        index: 3, 
        description: 'Select a school year to load data into.'
    },
    {
        name: OnBoardingWizardTabsData[4].contentName,
        index: 4,
        description: "We'll generate a key and secret you can use to connect to your SIS and other source providers."
    },
    { 
        name: OnBoardingWizardTabsData[5].contentName, 
        index: 5, 
        description: 'We’ll give you a preview of the data coming in from your SIS—make sure it looks correct.'
    },
    { 
        name: OnBoardingWizardTabsData[6].contentName, 
        index: 6, 
        description: 'You’ll see a list of SSO methods that have been made available to you. Select which ones you’d like to use and prompt a validation. '
    },
    { 
        name: OnBoardingWizardTabsData[7].contentName, 
        index: 7, 
        description: 'We’ll summarize all of the information for one last look so you can review and get up and running. '
    },
]

const filterStep = (stepIndex: number, isODS: boolean) => {
    if (stepIndex === 4 && isODS)
        return false

    return true
}

const updateTabContentToEdFi = (tab: ITabData, index: number, isODS: boolean) => {
    if (index === 3 && isODS) {
        tab.tabName = "Connect to Ed-Fi"
        tab.contentName = "Connect Apps to Ed-Fi"
    }

    return tab
}

const updateStepContentToEdFi = (step: StepData, index: number, isODS: boolean) => {
    if (index === 3 && isODS) {
        step.name = "Connect to Ed-Fi"
        step.description = "Input credentials to connect to an external Ed-Fi ODS."
    }

    return step
}

const selectStepsData = (isODS: boolean): IOnBoardingWizardStepData => {
    const onboardingWizardStepsData: IOnBoardingWizardStepData = {
        tabsData: OnBoardingWizardTabsData
            .filter((tab, index) => filterStep(index, isODS))
            .map((tab, index) => updateTabContentToEdFi(tab, index, isODS)),
        stepsData: OnBoardingWizardStepsList
            .filter((stepItem, index) => filterStep(index, isODS))
            .map((step, index) => updateStepContentToEdFi(step, index, isODS))
            .map((step, index) => ({...step, index }))
    }

    return onboardingWizardStepsData
}

const useOnboardingWizardStepsData = () => {
    const { externalODS } = useExternalODSData()
    const [onboardingStepsData, setOnboardingStepsData] = useState<IOnBoardingWizardStepData>(selectStepsData(externalODS.isExternalODS))

    useEffect(() => {
        if (externalODS.isExternalODS) {
            setOnboardingStepsData(selectStepsData(externalODS.isExternalODS))
        }
    }, [ externalODS ])

    return {
        onboardingStepsData
    }
}

export default useOnboardingWizardStepsData