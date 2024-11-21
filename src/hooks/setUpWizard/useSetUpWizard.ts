import {
  useContext, useState, useEffect 
} from 'react'
import { useNavigate } from 'react-router-dom'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import routes from '../../core/routes'
import { InstanceOnBoardingStepStatus } from '../../core/setUpWizard/setUpWizard.types'
import useOdsInstanceService from '../../services/ODSInstances/OdsInstanceService'
import { UpdateOdsInstanceOnboardingStepRequest } from '../../services/ODSInstances/OdsInstanceService.requests'
import useOdsInstanceData from '../odsInstances/useOdsInstanceData'
import useSetUpWizardGeneration from './useSetUpWizardGeneration'
import useOdsInstanceParamYear from '../odsInstances/useOdsInstanceParamYear'

export interface AllStepsProgressData {
    hasConnectedSIS: boolean  
}

const allStepsProgress: AllStepsProgressData = { hasConnectedSIS: false }

interface UpdateProgressProps {
    stepNumber: number 
    stepStatus: InstanceOnBoardingStepStatus 
}

const useSetUpWizard = () => {
  const { getInstanceYearFromPathName } = useOdsInstanceParamYear()

  const { 
    instance, 
    fetchingData 
  } = useOdsInstanceData({ instanceYear: getInstanceYearFromPathName() })

  const {
    setUpWizardData,
    setSetUpWizardData,
    isFetchingSetUpWizard
  } = useSetUpWizardGeneration({ instance })

  const {
    updateInstanceOnboardingStep
  } = useOdsInstanceService()

  const adminConfig = useContext(adminConsoleContext)
  const [ started, setStarted ] = useState(false)
  const [ currentStepIndex, setCurrentStepIndex ] = useState(0)
  const navigate = useNavigate()
  const [allStepsProgressData, setAllStepsProgressData] = useState<AllStepsProgressData>({ ...allStepsProgress })
  const [lastStep, setLastStep] = useState(3)

  const getCompletedSteps = () : number => {
    if (setUpWizardData) {
      return setUpWizardData.steps.filter(step => step.status === 'Completed').length
    }

    return 0
  }

  const completedSteps = getCompletedSteps()
  const lastInProgress = completedSteps

  const isOBActive = () => {
    if (setUpWizardData) {
      if (setUpWizardData.status !== 'Completed' && completedSteps < lastStep) {
        return true
      }
    }

    return false
  }

  const getCurrentStepStatus = (): InstanceOnBoardingStepStatus => {
    if (setUpWizardData) {
      const status = setUpWizardData.steps[currentStepIndex].status

      return status
    }

    return 'Pending'
  }

  const validateCanNext = (currentStepIndex: number) => {
    if (currentStepIndex === 0) {
      return allStepsProgressData.hasConnectedSIS
    }

    return true
  }

  const onCompletedStep = (stepIndex: number) => {
    const nallStepsProgressData = { ...allStepsProgressData }

    if (stepIndex === 0) {
      nallStepsProgressData.hasConnectedSIS = true
    }

    setAllStepsProgressData(nallStepsProgressData)
  }

  const onIncompletedStep = (stepIndex: number) => {
    const nallStepsProgressData = { ...allStepsProgressData }

    if (stepIndex === 0) {
      nallStepsProgressData.hasConnectedSIS = false
    }

    setAllStepsProgressData(nallStepsProgressData)
  }

  const canPrev = () => true
  const canNext = () => (currentStepIndex < lastStep) && validateCanNext(currentStepIndex)

  const handleFinalizeOB = async () => {
    await updateOBStepStatus({
      stepNumber: 3,
      stepStatus: 'Completed' 
    })

    navigate(routes.home.url)
  }
    
  const handleNext = async () => {        
    if (setUpWizardData) {
      console.log('HANDLE NEXT')

      const obData = { ...setUpWizardData }
      obData.steps[currentStepIndex].status = 'Completed'

      if (currentStepIndex + 2 < lastStep && obData.steps[currentStepIndex].status !== 'Completed') {
        obData.steps[currentStepIndex + 1].status = 'InProgress'
      }

      if (currentStepIndex + 1 < lastStep) {
        setCurrentStepIndex(currentStepIndex + 1)
      }
            
      setSetUpWizardData(obData)
      setStarted(true)

      await updateOBProgress()

      if (currentStepIndex + 1 === lastStep) {
        await handleFinalizeOB()
      }
    }
  }

  const handlePrev = () => {
    if (currentStepIndex === 0) {
      return setStarted(false)
    }

    setCurrentStepIndex(currentStepIndex - 1)
  }

  const handleGoToStep = async (index: number) => {
    console.log('Handle go to step', index)

    setCurrentStepIndex(index)
    setStarted(true)

    if (setUpWizardData) {
      if (setUpWizardData.steps[index].status === 'Pending') {
        const result = await updateOBStepStatus({
          stepNumber: index + 1,
          stepStatus: 'InProgress' 
        })

        if (!result) {
          console.log('failed to update step status', index + 1)
        }
      }
    }
  }

  const updateOBProgress = async () => {
    // console.log('Update OB progress')
    // console.log('update OB progress', currentStepIndex)

    const resultNext = await updateOBStepStatus({
      stepNumber: currentStepIndex + 1,
      stepStatus: 'Completed' 
    })

    if (!resultNext) {
      console.log('failed to update step status', currentStepIndex + 1)
    }

    if (currentStepIndex + 2 < lastStep) {
      const resultCurrent = await updateOBStepStatus({
        stepNumber: currentStepIndex + 2,
        stepStatus: 'InProgress' 
      })

      if (!resultCurrent) {
        console.log('failed to update step status', currentStepIndex + 1)
      } 
    }
  }

  const updateOBStepStatus = async ({ stepNumber, stepStatus }: UpdateProgressProps) => {
    if (!adminConfig || !instance) {
      return
    } 

    const request: UpdateOdsInstanceOnboardingStepRequest = {
      instanceId: instance.instanceId,
      tenantId: adminConfig.actionParams.tenantId,
      number: stepNumber,
      status: stepStatus
    }

    const result = await updateInstanceOnboardingStep(adminConfig.actionParams, request)

    if (result.type == 'Error') {
      return false
    } 

    return true
  }

  const updateCurrentStep = () => {
    if (setUpWizardData) {

      const ncurrentStep = setUpWizardData.steps.find(step => step.status !== 'Completed')

      if (ncurrentStep && ncurrentStep.number - 1 !== currentStepIndex) {
        setCurrentStepIndex(ncurrentStep.number - 1)
      }
    }
  }

  const updateStepsValidation = () => {
    if (setUpWizardData) {
      // console.log('Update steps validation')

      if (setUpWizardData.status !== 'Completed' && setUpWizardData.totalSteps === 8) {
        const nallStepsProgressData = { ...allStepsProgressData }

        console.log('update step validation', setUpWizardData.steps)

        if (setUpWizardData.steps[4].status === 'Completed') {
          nallStepsProgressData.hasConnectedSIS = true
        }

        // console.log('all steps validation after update', nallStepsProgressData)
        setAllStepsProgressData(nallStepsProgressData)
      }
    }
  }

  useEffect(() => {
    // console.log('Use effect')
    // updateCurrentStep()
    updateStepsValidation()

  }, [ setUpWizardData ])

  useEffect(() => {
    updateCurrentStep()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [ currentStepIndex, started ])

  return {
    instance,
    fetchingData,
    isOBActive,
    setUpWizardData,
    setSetUpWizardData,
    isFetchingSetUpWizard,
    updateOBStepStatus,
    started,
    currentStepIndex,
    getCurrentStepStatus,
    lastStep,
    lastInProgress,
    completedSteps,
    canNext,
    canPrev,
    onCompletedStep,
    onIncompletedStep,
    handleGoToStep,
    handleNext,
    handlePrev
  }
}

export default useSetUpWizard