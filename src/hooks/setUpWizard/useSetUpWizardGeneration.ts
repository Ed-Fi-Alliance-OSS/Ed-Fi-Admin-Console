import { useState, useEffect, useContext } from 'react'
import { TEEAuthDataContext, UserProfileContext } from '@edfi/admin-console-shared-sdk'
import { OnBoardingWizardData } from '../../core/onBoardingWizard/onBoardingWizard.types'
import { ODSInstance } from '../../core/ODSInstance.types'
import useSetUpWizardStepsMetadata from './useSetUpWizardStepsMetadata'
import useOdsInstanceService from '../../services/ODSInstances/OdsInstanceService'
import { InstanceOnboarding } from '../../core/setUpWizard/setUpWizard.types'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import { CreateOdsInstanceOnboardingStepRequest } from '../../services/ODSInstances/OdsInstanceService.requests'

interface UseSetUpWizardGenerationProps {
    instance: ODSInstance | null
}

const useSetUpWizardGeneration = ({ instance }: UseSetUpWizardGenerationProps) => {
  const { userProfile } = useContext(UserProfileContext)
  const adminConfig = useContext(adminConsoleContext)
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  const [ isFetchingSetUpWizard, setIsLoadingSetUpWizard ] = useState(true)
  const [ setUpWizardData, setSetUpWizardData] = useState<InstanceOnboarding | null>(null)
  const { setUpWizardStepsMetadata } = useSetUpWizardStepsMetadata()

  const { 
    getOdsInstanceById,
    createInstanceOnboardingStep
  } = useOdsInstanceService()

  const fetchOrSetOnBoardingDetails = async (instance: ODSInstance) => {
    if (!auth || !auth.user || !userProfile || !edxAppConfig || !adminConfig)
      return 

    console.log('generate instance', instance.instanceId)
    console.log('started fetching instance OB')
    setIsLoadingSetUpWizard(true)
    
    const data = instance.verificationStatus
        
    if (data) {
      if (!hasStartedOB(data) && data.steps.length < 3) {
        console.log('tenant has not started OB. Loading steps...')
        await setupInitialOnBoardingState(instance.instanceId)
                
        return await setWizardDataFromLatestInstanceOnboarding(instance.instanceId)
      }
                
      setIsLoadingSetUpWizard(false)
      setSetUpWizardData(data)
    }
    else {
      console.log('instance does not have OB data. Loading steps...')
      await setupInitialOnBoardingState(instance.instanceId)
            
      await setWizardDataFromLatestInstanceOnboarding(instance.instanceId)
    }
  }

  const hasStartedOB = (data: OnBoardingWizardData) : boolean => {
    if (data.status === 'Pending') 
      return false 

    return true
  }

  const setupInitialOnBoardingState = async (instanceId: string) => {
    console.log('Setting initial setup wizard state...')

    if (!auth || !auth.user || !userProfile || !edxAppConfig || !adminConfig)
      return 

    for (const step of setUpWizardStepsMetadata.stepsData) {
      console.log('creating step', step.index + 1, step.name)

      const request: CreateOdsInstanceOnboardingStepRequest = {
        instanceId,
        tenantId: adminConfig.actionParams.tenantId,
        number: step.index + 1,
        description: step.name,
        status: 'Pending'
      }

      await createInstanceOnboardingStep(adminConfig.actionParams, request)
    }
  }

  const setWizardDataFromLatestInstanceOnboarding = async (instanceId: string) => {
    if (!adminConfig)
      return 

    const response = await getOdsInstanceById(
      adminConfig.actionParams,
      instanceId)
        
    if (response.type == 'Response') {
      const onboarding = response.data.data[0].verificationStatus

      setIsLoadingSetUpWizard(false)
      return setSetUpWizardData(onboarding)
    }
  }

  useEffect(() => {
    if (userProfile && instance) {
      fetchOrSetOnBoardingDetails(instance)
    }
  }, [ userProfile, instance ])

  return {
    setUpWizardData,
    setSetUpWizardData,
    isFetchingSetUpWizard
  }
}

export default useSetUpWizardGeneration