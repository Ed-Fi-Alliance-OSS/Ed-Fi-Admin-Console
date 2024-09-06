import { Button, Flex } from "@chakra-ui/react"
import useOnboardingWizardStepsData from "../../../hooks/useOnBoardingWizardStepsData"
import WizardContentWrapper from "../Wizard/WizardContentWrapper"
import OnBoardingWizardStartLeft from "./OnBoardingWizardStartLeft"
import WizardStartRight from "../Wizard/WizardStartRight"

interface OnBoardingWizardStartProps {
    currentStepIndex: number 
    lastInProgress: number
    completedSteps: number 
    onGoToStep: (index: number) => void
}

const OnBoardingWizardStart = ({ currentStepIndex, lastInProgress, completedSteps, onGoToStep }: OnBoardingWizardStartProps) => {
    const { onboardingStepsData } = useOnboardingWizardStepsData()

    return (
        <WizardContentWrapper>
            <Flex justifyContent='space-between' h='full' w='full'>
                <OnBoardingWizardStartLeft 
                    hasStarted={completedSteps > 0} />
                <WizardStartRight
                    lastInProgress={lastInProgress}
                    currentStepIndex={currentStepIndex}
                    completedSteps={completedSteps}
                    stepsList={onboardingStepsData.stepsData}
                    onGoToStep={onGoToStep} />
            </Flex>
            <Flex justifyContent='flex-end' mt='auto'>
                <Button
                    onClick={() => onGoToStep(completedSteps === 0? 0 : completedSteps)}
                    variant='primaryBlue600'
                    size='lg'
                    minW='138px'>
                        { completedSteps > 0? 'Continue' : 'Start' }
                </Button>
            </Flex>
        </WizardContentWrapper>
    )
}

export default OnBoardingWizardStart