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
  const { userProfile } = useContext(UserProfileContext)
  const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
  const [   isFetchingOnBoardingWizard, setIsFetchingOnBoardingWizard ] = useState(true)
  const [ onBoardingWizardData, setOnBoardingWizardData ] = useState<OnBoardingWizardData | null>(null)
  const { onboardingStepsData } = useOnboardingWizardStepsData()
  const { config } = useConfig()
  // TODO: replace with actual tenant url
  const tenantMockUrl = `${config?.app.basePath}/mockdata/data-tenant.json`

  const fetchOnBoardingDetails = async () => {
    if (auth && auth.user && userProfile && edxAppConfig) {
      console.log('started fetching')
      setIsFetchingOnBoardingWizard(true)
      
      const data = await fetchOnBoardingWizardData({
        apiUrl: tenantMockUrl,
        tenantId: userProfile.tenantId,
        token: auth.user.access_token,
        apiConfig: edxAppConfig.api
      })

      // console.log('received onboarding data: ', data)
            
      if (data) {
        if (!hasStartedOB(data) && data.steps.length < 8) {
          console.log('tenant has not started OB. Loading steps...')
          await setupInitialOnBoardingState()
                    
          const initialOBData = await fetchOnBoardingWizardData({
            apiUrl: tenantMockUrl,
            tenantId: userProfile.tenantId,
            token: auth.user.access_token,
            apiConfig: edxAppConfig.api
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
          tenantId: userProfile.tenantId,
          token: auth.user.access_token,
          apiConfig:  edxAppConfig.api
        })
                
        if (initialOBData) {
          setIsFetchingOnBoardingWizard(false)
          return setOnBoardingWizardData(initialOBData)
        }
      }
    }
  }

  const hasStartedOB = (data: OnBoardingWizardData) : boolean => {
    if (data.status === 'Pending') {
      return false
    } 

    return true
  }

  const setupInitialOnBoardingState = async () => {
    console.log('setting initial onboarding wizard state...')

    if (auth && auth.user && userProfile && edxAppConfig) {
      for (const step of onboardingStepsData.stepsData) {

        console.log('creating step', step.index + 1, step.name)
        await createOnBoardingWizardStep({
          apiUrl: edxAppConfig.api.edfiApiBaseUri as string,
          tenantId: userProfile.tenantId,
          token: auth.user.access_token,
          description: step.name,
          number: step.index + 1,
          status: 'Pending',
          apiConfig: edxAppConfig?.api,
        })
      }
    }
  }

  useEffect(() => {
    if (userProfile) {
      fetchOnBoardingDetails()
    }
  }, [ userProfile ])

  return (
    <onBoardingWizardContext.Provider value={{
      onBoardingWizardData,
      setOnBoardingWizardData,
      isFetchingOnBoardingWizard 
    }}
    >
      {children}
    </onBoardingWizardContext.Provider>
  )
}

export default OnBoardingWizardProvider