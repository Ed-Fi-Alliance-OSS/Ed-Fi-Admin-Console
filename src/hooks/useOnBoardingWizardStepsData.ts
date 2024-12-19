import {
  useEffect, useState
} from 'react'
import { StepData } from '../core/onBoardingWizard/onBoardingWizard.types'
import useExternalODSData from './useExternalODSData'

interface ITabData {
  tabName: string
  contentName: string
}

interface IOnBoardingWizardStepData {
  tabsData: ITabData[]
  stepsData: StepData[]
}

const OnBoardingWizardTabsData = [
  { 
    tabName: 'Invite Users',
    contentName: 'Add Additional Admin Users',
    description: 'Give other users within your District/Charter School Admin Access. You\'ll need their email addresses.' 
  },
  {
    tabName: 'Select ODS Instance',
    contentName: 'Select ODS Instance',
    description: 'Select a school year to load data into.' 
  },
  {
    tabName: 'Connect Sources',
    contentName: 'Connect Your Source Providers',
    description: 'We\'ll generate a key and secret you can use to connect to your SIS and other source providers.' 
  },
  {
    tabName: 'Select SSO Methods',
    contentName: 'Select Single Sign-On Methods',
    description: 'You\'ll see a list of SSO methods that have been made available to you. Select which ones you\'d like to use and prompt a validation. ' 
  },
  {
    tabName: 'Finalize',
    contentName: 'Review and Finalize',
    description: 'We\'ll summarize all of the information for one last look so you can review and get up and running. ' 
  }
]

const OnBoardingWizardStepsList: StepData[] = OnBoardingWizardTabsData.map((tab, index) => ({
  name: tab.contentName,
  index,
  description: tab.description!
}))

const filterStep = (stepIndex: number, isODS: boolean) => {
  if (stepIndex === 4 && isODS) {
    return false
  }

  return true
}

const updateTabContentToEdFi = (tab: ITabData, index: number, isODS: boolean) => {
  if (index === 3 && isODS) {
    tab.tabName = 'Connect to Ed-Fi'
    tab.contentName = 'Connect Apps to Ed-Fi'
  }

  return tab
}

const updateStepContentToEdFi = (step: StepData, index: number, isODS: boolean) => {
  if (index === 3 && isODS) {
    step.name = 'Connect to Ed-Fi'
    step.description = 'Input credentials to connect to an external Ed-Fi ODS.'
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
      .map((step, index) => ({
        ...step,
        index 
      }))
  }

  return onboardingWizardStepsData
}

const useOnboardingWizardStepsData = () => {
  const { externalODS } = useExternalODSData()
  const [ onboardingStepsData, setOnboardingStepsData ] = useState<IOnBoardingWizardStepData>(selectStepsData(externalODS.isExternalODS))

  useEffect(() => {
    if (externalODS.isExternalODS) {
      setOnboardingStepsData(selectStepsData(externalODS.isExternalODS))
    }
  }, [ externalODS ])

  return { onboardingStepsData }
}

export default useOnboardingWizardStepsData