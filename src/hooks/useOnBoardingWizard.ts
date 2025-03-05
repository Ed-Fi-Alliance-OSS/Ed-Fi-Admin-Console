// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  TEEAuthDataContext,
  UserProfileContext
} from '@edfi/admin-console-shared-sdk'
import {
  useContext,
  useEffect,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import { adminConsoleContext } from '../context/adminConsoleContext'
import { useMockData } from '../context/mockDataContext'
import {
  onBoardingWizardContext, OnBoardingWizardDataWrapper
} from '../context/onBoardingWizardContext'
import { EdfiApplicationAuthData } from '../core/Edfi/EdfiApplications'
import { OnBoardingStepStatus } from '../core/onBoardingWizard/onBoardingWizard.types'
import routes from '../core/routes'
import { CreateConnectionRequest } from '../services/AdminActions/DataSync/DataSync.requests'
import useDataSyncService from '../services/AdminActions/DataSync/DataSyncService'
import { CreateEdfiApplicationRequest } from '../services/AdminActions/Edfi/Applications/EdfiApplicationService.requests'
import useEdfiApplicationsService from '../services/AdminActions/Edfi/Applications/EdfiApplicationsService'
import useEdfiVendorsService from '../services/AdminActions/Edfi/Vendors/EdfiVendorsService'
import useEDXToast from './common/useEDXToast'
import useEdfiUrls from './useEdfiUrls'
import useExternalODSData from './useExternalODSData'
import useTenantInfo from './useTenantInfo'

export interface AllStepsProgressData {
    hasInvitedUsers: boolean
    hasCompletedTraining: boolean
    hasVerifiedDomain: boolean 
    hasEdFiConnection: boolean
    hasConnectedSIS: boolean  
}

const allStepsProgress: AllStepsProgressData = {
  hasInvitedUsers: false,
  hasCompletedTraining: false,
  hasVerifiedDomain: false,
  hasEdFiConnection: false,
  hasConnectedSIS: false
}

interface UpdateProgressProps {
    stepNumber: number 
    stepStatus: OnBoardingStepStatus 
}

const selectLastStepValue = (isODS: boolean) => {
  if (!isODS) {
    return 5
  }

  return 5
}

const useOnBoardingWizard = () => {
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const { userProfile } = useContext(UserProfileContext)
  const adminConfig = useContext(adminConsoleContext)
  const { edfiInfo } = useEdfiUrls()
  const { onBoardingWizardData, setOnBoardingWizardData, isFetchingOnBoardingWizard } = useContext(onBoardingWizardContext) as OnBoardingWizardDataWrapper
  const [ started, setStarted ] = useState(false)
  const [ currentStepIndex, setCurrentStepIndex ] = useState(0)
  const navigate = useNavigate()
  const [ allStepsProgressData, setAllStepsProgressData ] = useState<AllStepsProgressData>({ ...allStepsProgress })
  const { createEdfiApplication, getEdfiApplicationsList } = useEdfiApplicationsService()
  const { getVendorsList } = useEdfiVendorsService()
  const { createConnection } = useDataSyncService()
  const { getCurrentTenant } = useTenantInfo()
  const { successToast, errorToast } = useEDXToast()
  const { externalODS } = useExternalODSData()
  const [ lastStep, setLastStep ] = useState(selectLastStepValue(externalODS.isExternalODS))
  const mock = useMockData()
    
  console.log('has connected sis', allStepsProgressData.hasConnectedSIS)
  console.log('Onboarding wizard data', onBoardingWizardData)
  console.log('progress data', allStepsProgressData)

  const getCompletedSteps = () : number => {
    if (onBoardingWizardData) {
      return onBoardingWizardData.steps.filter(step => step.status === 'Completed').length
    }

    return 0
  }

  const completedSteps = getCompletedSteps()
  const lastInProgress = completedSteps

  const isOBActive = () => {
    if (onBoardingWizardData) {
      if (onBoardingWizardData.status !== 'Completed' && completedSteps < lastStep) {
        return true
      }
    }

    return false
  }

  const getCurrentStepStatus = (): OnBoardingStepStatus => {
    if (onBoardingWizardData) {
      const status = onBoardingWizardData.steps[currentStepIndex].status

      return status
    }

    return 'Pending'
  }

  const validateCanNext = (currentStepIndex: number) => {
    // if (currentStepIndex === 0)
    // return allStepsProgressData.hasInvitedUsers
    // else if (currentStepIndex === 1)
    // return allStepsProgressData.hasCompletedTraining
    // else if (currentStepIndex === 2)
    // return allStepsProgressData.hasVerifiedDomain
    // else if (currentStepIndex === 3 && externalODS.isExternalODS)
    // return allStepsProgressData.hasEdFiConnection
    // else if (currentStepIndex === 4 && !externalODS.isExternalODS)
    // return allStepsProgressData.hasConnectedSIS

    return true
  }

  const onCompletedStep = (stepIndex: number) => {
    const nallStepsProgressData = { ...allStepsProgressData }
    // if (stepIndex === 0)
    nallStepsProgressData.hasInvitedUsers = true
    // else if (stepIndex === 1)
    nallStepsProgressData.hasCompletedTraining = true
    // else if (stepIndex === 2)
    nallStepsProgressData.hasVerifiedDomain = true
    // else if (stepIndex === 3 && externalODS.isExternalODS)
    nallStepsProgressData.hasEdFiConnection = true
    // else if (stepIndex === 4)
    nallStepsProgressData.hasConnectedSIS = true

    setAllStepsProgressData(nallStepsProgressData)
  }

  const onIncompletedStep = (stepIndex: number) => {
    const nallStepsProgressData = { ...allStepsProgressData }
    // if (stepIndex === 0)
    nallStepsProgressData.hasInvitedUsers = true
    // else if (stepIndex === 1)
    nallStepsProgressData.hasCompletedTraining = true
    // else if (stepIndex === 2)
    nallStepsProgressData.hasVerifiedDomain = true
    // else if (stepIndex === 3 && externalODS.isExternalODS)
    nallStepsProgressData.hasEdFiConnection = true
    // else if (stepIndex === 4)
    nallStepsProgressData.hasConnectedSIS = true

    setAllStepsProgressData(nallStepsProgressData)
  }

  const canPrev = () => true
  const canNext = () => (currentStepIndex < lastStep) && validateCanNext(currentStepIndex)

  const checkIfApplicationExists = async (applicationName: string): Promise<boolean> => {
    if (adminConfig) {
      const applicationsListRequest = await getEdfiApplicationsList(adminConfig.actionParams)

      if (applicationsListRequest.type === 'Response') {
        const techApplication = applicationsListRequest.data.find(application => application.applicationName === applicationName)

        if (!techApplication) {
          return false
        }
      }
    }

    return true
  }

  const createTechApplication = async (): Promise<EdfiApplicationAuthData | null> => {
    console.log('Create tech console: edfi application')
    if (adminConfig) {
      const currentTenant = getCurrentTenant()
      const applicationName = `Tech Console SIS ${currentTenant?.organizationName}`
      const applicationExists = await checkIfApplicationExists(applicationName)
      console.log(applicationExists? 'Application exists' : 'Application does not exist')
      if (applicationExists) {
        return null
      }
            
      console.log('Create tech console: application does not exist, create it')
      const vendorsList = await getVendorsList(adminConfig.actionParams)

      if (vendorsList.type === 'Response') {
        const exchangeVendor = vendorsList.data.find(vendor => vendor.company === 'Texas Exchange')

        if (exchangeVendor) {
          const data: CreateEdfiApplicationRequest = {
            applicationName,
            vendorId: exchangeVendor.vendorId ?? 0,
            claimSetName: 'SIS/HR/Finance Vendor',
            educationOrganizationIds: [ currentTenant? currentTenant.organizationIdentifier : 'unknown' ]
          }
        
          console.log('Create tech console application with data', data)
          const result = await createEdfiApplication(adminConfig.edfiActionParams, data)

          console.log(result.type === 'Response'? 'Created tech console app' : 'failed to create tech console app')
          if (result.type === 'Response') {
            return result.data
          }
        }
      }
    }

    return null
  }

  const connectWithCredentials = async () => {
    if (adminConfig && edfiInfo) {
      console.log('Create tech console: connect with generated credentials')
      const createApplicationResult = await createTechApplication()
    
      if (createApplicationResult) {
        console.log('Create tech console: received credentials.')
        const currentTenant = getCurrentTenant()

        const data: CreateConnectionRequest = {
          tenantId: adminConfig.actionParams.tenantId,
          connectionId: '2c307188-e68f-4fc9-965c-c32a1c0e12ed',
          name: `The Texas Education Exchange - Tech Console Sync - ${currentTenant? currentTenant.organizationIdentifier : ''}`,
          providerId: '89b0eb33-5cbe-45e1-a130-ecf8f1b36b6a',
          connectionTypeId: '702c09ce-9f63-4269-b815-e77cd0be98f2',
          connectionMetadata: [
            {
              code: 'apiAuthorizationUrl',
              value: edfiInfo.urls.oauth,
              isSecret: false
            },
            {
              code: 'apiResourcesUrl',
              value: edfiInfo.urls.dataManagementApi,
              isSecret: false
            },
            {
              code: 'apiKey',
              value: createApplicationResult.key ?? '',
              isSecret: false
            },
            {
              code: 'apiSecret',
              value: createApplicationResult.secret ?? '',
              isSecret: true
            }
          ]
        }

        console.log('create connection request', data)
        console.log('creating connection')
        const result = await createConnection(adminConfig.actionParams, data)

        if (result.type === 'Response') {
          successToast('Created connection for Tech Console.')
        } else {
          errorToast('Failed to create connection for Tech Console.')
        }
      }
    }
  }

  const handleFinalizeOB = async () => {
    await connectWithCredentials()

    if (externalODS.isExternalODS) {
      await updateOBStepStatus({
        stepNumber: 8,
        stepStatus: 'Completed' 
      })
    }

    navigate(routes.home.url)
  }
    
  const handleNext = async () => {        
    if (onBoardingWizardData) {
      console.log('HANDLE NEXT')

      const obData = { ...onBoardingWizardData }
      obData.steps[currentStepIndex].status = 'Completed'

      if (currentStepIndex + 2 < lastStep && obData.steps[currentStepIndex].status !== 'Completed') {
        obData.steps[currentStepIndex + 1].status = 'InProgress'
      }

      if (currentStepIndex + 1 < lastStep) {
        setCurrentStepIndex(currentStepIndex + 1)
      }
            
      setOnBoardingWizardData(obData)
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
    // console.log('Handle go to step')

    setCurrentStepIndex(index)
    setStarted(true)

    if (onBoardingWizardData) {
      if (onBoardingWizardData.steps[index].status === 'Pending') {
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
    // console.log('Update OB step status')

    // const apiUrl = edxAppConfig?.api.edfiApiBaseUri as string
    const token = auth?.user?.access_token as string 
    const tenantId = userProfile?.tenantId as string 

    // const result = await updateOnBoardingWizardStep({ 
    //   apiUrl: '',
    //   token,
    //   tenantId,
    //   stepNumber,
    //   stepStatus,
    //   apiConfig: edxAppConfig?.api
    // })

    // if (result.tenantId === userProfile?.tenantId) {
    //   return true
    // }
    // TODO: remove this mock data code and replace with actual API call
    localStorage.setItem(`onboarding.step.${stepNumber}`, stepStatus)
    return true

    // return false
  }

  const updateCurrentStep = () => {
    if (onBoardingWizardData) {
      // console.log('Update current step')

      const ncurrentStep = onBoardingWizardData.steps.find(step => step.status !== 'Completed')

      if (ncurrentStep && ncurrentStep.number - 1 !== currentStepIndex) {
        setCurrentStepIndex(ncurrentStep.number - 1)
      }
    }
  }

  const updateStepsValidation = () => {
    if (onBoardingWizardData) {
      console.log('Update steps validation')

      if (onBoardingWizardData.status !== 'Completed' && onBoardingWizardData.totalSteps === 8) {
        const nallStepsProgressData = { ...allStepsProgressData }

        console.log('update step validation', onBoardingWizardData.steps)

        if (onBoardingWizardData.steps[0].status === 'Completed') {
          nallStepsProgressData.hasInvitedUsers = true
        }

        if (onBoardingWizardData.steps[1].status === 'Completed') {
          nallStepsProgressData.hasCompletedTraining = true
        }

        if (onBoardingWizardData.steps[2].status === 'Completed') {
          nallStepsProgressData.hasVerifiedDomain = true
        }

        if (onBoardingWizardData.steps[3].status === 'Completed' && externalODS.isExternalODS) {
          nallStepsProgressData.hasEdFiConnection = true
        }

        if (onBoardingWizardData.steps[4].status === 'Completed') {
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

  }, [ onBoardingWizardData, externalODS ])

  useEffect(() => {
    updateCurrentStep()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [ currentStepIndex, started ])

  useEffect(() => {
    if (externalODS.isExternalODS) {
      setLastStep(selectLastStepValue(externalODS.isExternalODS))
    }
  }, [ externalODS ])

  return {
    isOBActive,
    onBoardingWizardData,
    setOnBoardingWizardData,
    isFetchingOnBoardingWizard,
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

export default useOnBoardingWizard 