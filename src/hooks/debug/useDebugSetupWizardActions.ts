import { useContext } from 'react'
import { OnBoardingStepStatus } from "../../core/onBoardingWizard/onBoardingWizard.types"
import { ODSInstance } from '../../core/ODSInstance.types'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import { CreateOdsInstanceOnboardingStepRequest, UpdateOdsInstanceOnboardingStepRequest } from '../../services/ODSInstances/OdsInstanceService.requests'
import useOdsInstanceService from '../../services/ODSInstances/OdsInstanceService'

interface UpdateStepProps {
    number: number 
    status: OnBoardingStepStatus
}

interface AddStepProps {
    number: number 
    description: string 
    status: OnBoardingStepStatus
}

interface UseDebugSetupWizardActionsProps {
    instance: ODSInstance | null
}

const useDebugSetupWizardActions = ({ instance }: UseDebugSetupWizardActionsProps) => {
    const adminConfig = useContext(adminConsoleContext)
    
    const {
        createInstanceOnboardingStep,
        updateInstanceOnboardingStep
    } = useOdsInstanceService()

    const handleAddStep = async ({ number, status, description }: AddStepProps) => {
        console.log('handle add step')
        if (!adminConfig || !instance)
            return 

        const request: CreateOdsInstanceOnboardingStepRequest = {
            instanceId: instance.instanceId,
            tenantId: adminConfig.actionParams.tenantId,
            number,
            description,
            status
        }

        const result = await createInstanceOnboardingStep(adminConfig.actionParams, request)        

        if (result.type == 'Error')
            return false

        return true
    }

    const handleUpdateStep = async ({ number, status }: UpdateStepProps) => {
        console.log("update step", number)

        if (!adminConfig || !instance)
            return 

        const request: UpdateOdsInstanceOnboardingStepRequest = {
            instanceId: instance.instanceId,
            tenantId: adminConfig.actionParams.tenantId,
            number,
            status
        }

        const result = await updateInstanceOnboardingStep(adminConfig.actionParams, request)

        if (result.type == 'Error')
            return false 

        return true
    }

    return {
        handleAddStep,
        handleUpdateStep
    }
}

export default useDebugSetupWizardActions