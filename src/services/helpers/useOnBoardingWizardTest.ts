import { useContext } from 'react'
import axios, { AxiosError } from "axios"
import { OnBoardingStepStatus } from "../../core/onBoardingWizard/onBoardingWizard.types"
import { TEEAuthDataContext, UserProfileContext } from '@edfi/admin-console-shared-sdk'
import { fetchOnBoardingWizardData } from '../OnBoardingWizard/onBoardingWizardService'


interface UpdateStepProps {
    number: number 
    status: OnBoardingStepStatus
}

interface AddStepProps {
    number: number 
    description: string 
    status: OnBoardingStepStatus
}

interface AddStepRequestData {
    tenantId: string
    number: number
    description: string
    status: OnBoardingStepStatus
}

interface UpdateStepRequestData {
    tenantId: string 
    number: number 
    status: OnBoardingStepStatus
}

const useResetOnBoardingWizardTest = () => {
    const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
    const { userProfile } = useContext(UserProfileContext)

    const handleAddStep = async ({ number, status, description }: AddStepProps) => {
        console.log('handle add step')

        const tenantId = userProfile?.tenantId as string
        const createStepUrl = `${edxAppConfig?.api.baseUri}/tenants/${tenantId}/onboardingsteps`

        try {
            const requestData: AddStepRequestData = {
                tenantId: tenantId,
                number,
                status,
                description
            }

            console.log("request create step data", requestData)

            const result = await axios.post(createStepUrl, requestData, {
                headers: {
                    Authorization: `Bearer ${auth?.user?.access_token}`
                }
            })
    
            console.log("created step result", result.data)

            const onboardingWizardData = await fetchOnBoardingWizardData({ 
                apiUrl: edxAppConfig?.api.baseUri as string ,
                token: auth?.user?.access_token as string,
                tenantId
            })

            console.log("all data after created step", onboardingWizardData)

            return true
        }
        catch(ex) {
            if (ex instanceof AxiosError) {
                console.log("error when updating onboarding wizard step wizard data", ex.message)
            }
            else {
                console.log(ex)
            }

            return false
        }
    }

    const handleUpdateStep = async ({ number, status }: UpdateStepProps) => {
        console.log("update step", number)

        const tenantId = userProfile?.tenantId as string
        const updateStepUrl = `${edxAppConfig?.api.baseUri}/tenants/${tenantId}/onboardingsteps/${number}`

        try {
            const requestData: UpdateStepRequestData = {
                tenantId: tenantId,
                number,
                status
            }

            console.log("request data", requestData)

            const result = await axios.put(updateStepUrl, requestData, {
                headers: {
                    Authorization: `Bearer ${auth?.user?.access_token}`
                }
            })
    
            console.log("updated step result", result.data)

            const onboardingWizardData = await fetchOnBoardingWizardData({ 
                apiUrl: edxAppConfig?.api.baseUri as string ,
                token: auth?.user?.access_token as string,
                tenantId
            })

            console.log("all data after updated step", onboardingWizardData)

            return true
        }
        catch(ex) {
            if (ex instanceof AxiosError) {
                console.log("error when updating onboarding wizard step wizard data", ex.message)
            }
            else {
                console.log(ex)
            }

            return false
        }
    }

    const handleResetOnBoardingWizard = async () => {

    }

    return {
        handleResetOnBoardingWizard,
        handleAddStep,
        handleUpdateStep
    }
}

export default useResetOnBoardingWizardTest