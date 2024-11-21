import { useState } from 'react'
import { StepData } from '../../core/onBoardingWizard/onBoardingWizard.types'

interface ITabData {
    tabName: string 
    contentName: string 
}

interface IOnBoardingWizardStepData {
    tabsData: ITabData[]
    stepsData: StepData[]
}

const SetUpWizardTabsData = [
  {
    tabName: 'Connect Sources',
    contentName: 'Connect Your Source Providers' 
  },
  {
    tabName: 'Review Data',
    contentName: 'Review Data' 
  },
  {
    tabName: 'Finalize',
    contentName: 'Review and Finalize' 
  }
]

const OnBoardingWizardStepsList: StepData[] = [
  {
    name: SetUpWizardTabsData[0].contentName,
    index: 0,
    description: 'We\'ll generate a key and secret you can use to connect to your SIS and other source providers.'
  },
  { 
    name: SetUpWizardTabsData[1].contentName, 
    index: 1, 
    description: 'We’ll give you a preview of the data coming in from your SIS—make sure it looks correct.'
  },
  { 
    name: SetUpWizardTabsData[2].contentName, 
    index: 2, 
    description: 'We’ll summarize all of the information for one last look so you can review and get up and running. '
  },
]

const selectStepsData = (): IOnBoardingWizardStepData => {
  const stepsData: IOnBoardingWizardStepData = {
    tabsData: SetUpWizardTabsData
      .map(tab => tab),
    stepsData: OnBoardingWizardStepsList
      .map((step, index) => ({
        ...step,
        index 
      }))
  }

  return stepsData
}

const useSetUpWizardStepsMetadata = () => {
  const [setUpWizardStepsMetadata, setSetUpWizardStepsMetadata] = useState<IOnBoardingWizardStepData>(selectStepsData())

  return { setUpWizardStepsMetadata }
}

export default useSetUpWizardStepsMetadata