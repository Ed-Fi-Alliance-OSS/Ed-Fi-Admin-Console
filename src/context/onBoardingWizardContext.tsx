// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  TEEAuthDataContext, useConfig, UserProfileContext
} from '@edfi/admin-console-shared-sdk'
import {
  createContext, useContext, useEffect, useState
} from 'react'
import { OnBoardingWizardData } from '../core/onBoardingWizard/onBoardingWizard.types'
import useOnboardingWizardStepsData from '../hooks/useOnBoardingWizardStepsData'
import {
  createOnBoardingWizardStep, fetchOnBoardingWizardData
} from '../services/OnBoardingWizard/onBoardingWizardService'

export interface OnBoardingWizardDataWrapper {
    onBoardingWizardData: OnBoardingWizardData | null
    setOnBoardingWizardData: React.Dispatch<React.SetStateAction<OnBoardingWizardData | null>>
    isFetchingOnBoardingWizard: boolean
}

export const onBoardingWizardContext = createContext<OnBoardingWizardDataWrapper | null>(null)

interface OnBoardingWizardProviderProps {
    children: JSX.Element
}

const OnBoardingWizardProvider = ({ children }: OnBoardingWizardProviderProps) => {
  const { userProfile } = useContext(UserProfileContext);
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext);
  const [ isFetchingOnBoardingWizard, setIsFetchingOnBoardingWizard] = useState(true);
  const [ onBoardingWizardData, setOnBoardingWizardData] = useState<OnBoardingWizardData | null>(null);
  const { onboardingStepsData } = useOnboardingWizardStepsData();
  const { config } = useConfig();
  const tenantMockUrl = `${config?.app.basePath}/mockdata/data-tenant.json`;

  const fetchOnBoardingDetails = async () => {
    if (auth && userProfile && edxAppConfig) {
      console.log('started fetching')
      setIsFetchingOnBoardingWizard(true)

      try {
        // Resolve the auth.user promise
        const user = await auth.user

        const data = await fetchOnBoardingWizardData({
          apiUrl: tenantMockUrl,
          tenantId: 'tenant1',
          token: user?.access_token || '', // Use resolved user object
          apiConfig: edxAppConfig.api,
        })

        if (data) {
          if (!hasStartedOB(data) && data.steps.length < 8) {
            console.log('tenant has not started OB. Loading steps...');
            await setupInitialOnBoardingState()

            const initialOBData = await fetchOnBoardingWizardData({
              apiUrl: tenantMockUrl,
              tenantId: 'tenant1',
              token: user?.access_token || '', // Use resolved user object or fallback to an empty string
              apiConfig: edxAppConfig.api,
            })

            if (initialOBData) {
              setIsFetchingOnBoardingWizard(false)
              return setOnBoardingWizardData(initialOBData)
            }
          }

          setIsFetchingOnBoardingWizard(false)
          setOnBoardingWizardData(data)
        } else {
          console.log('tenant does not have OB data. Loading steps...')
          await setupInitialOnBoardingState()

          const initialOBData = await fetchOnBoardingWizardData({
            apiUrl: tenantMockUrl,
            tenantId: 'tenant1',
            token: user?.access_token || '', // Use resolved user object
            apiConfig: edxAppConfig.api,
          })

          if (initialOBData) {
            setIsFetchingOnBoardingWizard(false)
            return setOnBoardingWizardData(initialOBData)
          }
        }
      } catch (error) {
        console.error('Error fetching onboarding details:', error)
        setIsFetchingOnBoardingWizard(false)
      }
    }
  }

  const hasStartedOB = (data: OnBoardingWizardData): boolean => {
    return data.status !== 'Pending'
  }

  const setupInitialOnBoardingState = async () => {
    console.log('setting initial onboarding wizard state...')

    if (auth && userProfile && edxAppConfig) {
      try {
        // Resolve the auth.user promise
        const user = await auth.user

        for (const step of onboardingStepsData.stepsData) {
          console.log('creating step', step.index + 1, step.name)
          await createOnBoardingWizardStep({
            apiUrl: edxAppConfig.api.edfiApiBaseUri as string,
            tenantId: 'tenant1',
            token: user?.access_token || '', // Use resolved user object
            description: step.name,
            number: step.index + 1,
            status: 'Pending',
            apiConfig: edxAppConfig?.api,
          })
        }
      } catch (error) {
        console.error('Error setting up initial onboarding state:', error);
      }
    }
  };

  useEffect(() => {
    if (userProfile) {
      fetchOnBoardingDetails()
    }
  }, [ userProfile ])

  return (
    <onBoardingWizardContext.Provider
      value={{
        onBoardingWizardData,
        setOnBoardingWizardData,
        isFetchingOnBoardingWizard,
      }}
    >
      {children}
    </onBoardingWizardContext.Provider>
  )
}

export default OnBoardingWizardProvider