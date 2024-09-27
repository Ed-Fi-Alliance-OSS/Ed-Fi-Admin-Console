import axios, { AxiosError } from "axios"
import { OnBoardingWizardData } from "../../core/onBoardingWizard/onBoardingWizard.types"
import { AddStepProps, AddStepRequestData, FetchOnBoardingWizardData, UpdateOnBoardingWizardDataProps, UpdateOnBoardingWizardDataRequest } from "./onBoardingWizardService.types"

const fetchOnBoardingWizardData = async ({ apiUrl, tenantId, token }: FetchOnBoardingWizardData) => {
    // const currentTenantUrl = `${apiUrl}/tenants/${tenantId}`
    const currentTenantUrl = `/data-tenant.json`

    try {
        if (token) {
            const response = await axios.get(currentTenantUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            return response.data["onboarding"] as OnBoardingWizardData
        }

        return null
    }
    catch(e) {
        if (e instanceof AxiosError) {
            console.log("error when fetching onBoarding wizard data", e.message)
        }
        else {
            console.log(e)
        }

        const obfake: OnBoardingWizardData = {
            status: 'Pending',
            steps: [
                { 
                    description: '',
                    status: 'Pending',
                    number: 1
                },
                { 
                    description: '',
                    status: 'Pending',
                    number: 2
                },
                { 
                    description: '',
                    status: 'Pending',
                    number: 3
                },
                { 
                    description: '',
                    status: 'Pending',
                    number: 4
                },
                { 
                    description: '',
                    status: 'Pending',
                    number: 5
                },
                { 
                    description: '',
                    status: 'Pending',
                    number: 6
                },
                { 
                    description: '',
                    status: 'Pending',
                    number: 7
                },
                { 
                    description: '',
                    status: 'Pending',
                    number: 8
                }
            ],
            progressPercentage: 0,
            totalSteps: 8
        }

        return obfake
    }
}

const updateOnBoardingWizardStep = async ({ apiUrl, tenantId, token, stepStatus, stepNumber }: UpdateOnBoardingWizardDataProps) => {
    // const updateOnBoardingWizardDataUrl = `${apiUrl}/tenants/${tenantId}/onboardingsteps/${stepNumber}`
    const updateOnBoardingWizardDataUrl = `data-step.json`

    // console.log('update on boarding wizard step (service): stepNumber', stepNumber)
    // console.log('update on boarding wizard step (service): url', updateOnBoardingWizardDataUrl)

    try {
        if (token) {
            const data: UpdateOnBoardingWizardDataRequest = {
                tenantId,
                number: stepNumber,
                status: stepStatus
            }

            const response = await axios.put(updateOnBoardingWizardDataUrl, data ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            return response.data
        }

        return null
    }
    catch(e) {
        if (e instanceof AxiosError) {
            console.log("error when fetching onBoarding wizard data", e.message)
        }
        else {
            console.log(e)
        }

        return null
    }
}

const createOnBoardingWizardStep = async ({ apiUrl, tenantId, token, number, status, description }: AddStepProps) => {
    // console.log('create onboarding wizard step')

    const createStepUrl = `data-steps.json`

    try {
        const requestData: AddStepRequestData = {
            tenantId,
            number,
            status,
            description
        }

        // console.log("request create step data", requestData)

        const result = await axios.post(createStepUrl, requestData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // console.log("created step result", result.data)

        return true
    }
    catch(ex) {
        if (ex instanceof AxiosError) {
            console.log("error when creating onboarding wizard step wizard data", ex.message)
        }
        else {
            console.log(ex)
        }

        return false
    }
}

export {
    fetchOnBoardingWizardData,
    createOnBoardingWizardStep,
    updateOnBoardingWizardStep
}