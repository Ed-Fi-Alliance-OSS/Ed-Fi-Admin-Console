import {
  Button, Flex
} from '@chakra-ui/react'
import useOnboardingWizardStepsData from '../../../hooks/useOnBoardingWizardStepsData'
import WizardContentWrapper from '../Wizard/WizardContentWrapper'
import WizardStartRight from '../Wizard/WizardStartRight'
import OnBoardingWizardStartLeft from './OnBoardingWizardStartLeft'

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
      

      <Flex
        h='full'
        justifyContent='space-between'
        w='full'
      >
        <OnBoardingWizardStartLeft hasStarted={completedSteps > 0} />

        <WizardStartRight
          completedSteps={completedSteps}
          currentStepIndex={currentStepIndex}
          lastInProgress={lastInProgress}
          stepsList={onboardingStepsData.stepsData}
          onGoToStep={onGoToStep}
        />
      </Flex>

      <Flex
        justifyContent='flex-end'
        mt='auto'
      >
        <Button
          minW='138px'
          size='lg'
          variant='primaryBlue600'
          onClick={() => onGoToStep(completedSteps === 0? 0 : completedSteps)}
        >
          { completedSteps > 0? 'Continue' : 'Start' }
        </Button>
      </Flex>
    </WizardContentWrapper>
  )
}

export default OnBoardingWizardStart