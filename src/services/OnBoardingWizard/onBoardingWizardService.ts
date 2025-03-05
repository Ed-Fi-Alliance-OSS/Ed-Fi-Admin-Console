// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { range } from 'lodash-es'
import {
  OnBoardingStepStatus, OnBoardingWizardData
} from '../../core/onBoardingWizard/onBoardingWizard.types'
import {
  AddStepProps,
  FetchOnBoardingWizardData, UpdateOnBoardingWizardDataProps
} from './onBoardingWizardService.types'

const fetchOnBoardingWizardData = async ({ apiUrl, tenantId, token, apiConfig }: FetchOnBoardingWizardData) => {
  // const currentTenantUrl = `${apiUrl}/tenants/${tenantId}`
  //const currentTenantUrl = `/data-tenant.json`
  // const currentTenantUrl = apiConfig?.useLocalMockData ?? true
  //   ? `/data-tenant.json`
  //   : `${apiConfig?.baseUri ?? ''}/adminconsole/tenant?id=1`
  // const authorizationToken = await includeAuthorization(token, apiConfig)

  // try {
  //   if(authorizationToken) {
  //     const response = await axios.get(apiUrl, authorizationToken)
  //     return response.data['onboarding'] as OnBoardingWizardData
  //   }

  //   return null
  // } catch(e) {
  //   if (e instanceof AxiosError) {
  //     console.log('error when fetching onBoarding wizard data', e.message)
  //   } else {
  //     console.log(e)
  //   }
  const steps = range(1, 6).map((i) => ({
    description: '',
    number: i,
    status: (localStorage.getItem(`onboarding.step.${i}`) ?? 'Pending') as OnBoardingStepStatus
  }))

  const obfake: OnBoardingWizardData = {
    status: 'InProgress',
    steps: steps,
    progressPercentage: steps.findIndex(step => step.status === 'InProgress') / steps.length,
    totalSteps: 5
  }

  return obfake
  // }
}

const updateOnBoardingWizardStep = async ({ apiUrl, tenantId, token, stepStatus, stepNumber, apiConfig }: UpdateOnBoardingWizardDataProps) => {
  // const updateOnBoardingWizardDataUrl = `${apiUrl}/tenants/${tenantId}/onboardingsteps/${stepNumber}`
  // const updateOnBoardingWizardDataUrl = `data-step.json`
  // const updateOnBoardingWizardDataUrl = `${apiConfig?.baseUri ?? ''}/adminconsole/step`
  // console.log('update on boarding wizard step (service): stepNumber', stepNumber)
  // console.log('update on boarding wizard step (service): url', updateOnBoardingWizardDataUrl)
  // const mock = useMockData()
  localStorage.setItem(`onboarding.step.${stepNumber}`, stepStatus ?? 'Pending')
  localStorage.setItem('onboarding.currentStep', stepNumber.toString())
  return { tenantId, }
  
  // const authorizationToken = await includeAuthorization(token, apiConfig)

  // try {
  //   if(authorizationToken) {
  //     const data: UpdateOnBoardingWizardDataRequest = {
  //       tenantId,
  //       number: stepNumber,
  //       status: stepStatus
  //     }

  //     const response = await axios.put(updateOnBoardingWizardDataUrl, data, authorizationToken)
            
  //     return response.data
  //   }

  //   return null
  // } catch(e) {
  //   if (e instanceof AxiosError) {
  //     console.log('error when fetching onBoarding wizard data', e.message)
  //   } else {
  //     console.log(e)
  //   }

  //   return null
  // }
}

const createOnBoardingWizardStep = async ({ apiUrl, tenantId, token, number, status, description, apiConfig }: AddStepProps) => {
  // console.log('create onboarding wizard step')

  // const createStepUrl = `data-steps.json`
  // const createStepUrl = `${apiConfig?.baseUri ?? ''}/adminconsole/steps`

  // const mock = useMockData()
  // check if there is already a step with the same number
  if(!localStorage.getItem(`onboarding.step.${number}`)) {
    localStorage.setItem(`onboarding.step.${number}`, status ?? 'Pending')
  }

  // localStorage.setItem('onboarding.currentStep', number.toString())
  return { tenantId, }

  // const authorizationToken = await includeAuthorization(token, apiConfig)

  // try {
  //   if(authorizationToken){
  //     const requestData: AddStepRequestData = {
  //       tenantId,
  //       number,
  //       status,
  //       description
  //     }

  //     // console.log("request create step data", requestData)
            
  //     const result = await axios.post(createStepUrl, requestData, authorizationToken)

  //     // console.log("created step result", result.data)

  //     return true
  //   }

  //   return null
  // } catch(ex) {
  //   if (ex instanceof AxiosError) {
  //     console.log('error when creating onboarding wizard step wizard data', ex.message)
  //   } else {
  //     console.log(ex)
  //   }

  //   return false
  // }
}

export {
  createOnBoardingWizardStep, fetchOnBoardingWizardData, updateOnBoardingWizardStep
}
