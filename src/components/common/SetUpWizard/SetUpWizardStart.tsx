import {
  Button, Flex 
} from '@chakra-ui/react'
import WizardStartRight from '../Wizard/WizardStartRight'
import WizardContentWrapper from '../Wizard/WizardContentWrapper'
import SetUpWizardStartLeft from './SetUpWizardStartLeft'
import useSetUpWizardStepsMetadata from '../../../hooks/setUpWizard/useSetUpWizardStepsMetadata'

interface SetUpWizardStartProps {
    currentStepIndex: number 
    lastInProgress: number
    completedSteps: number 
    onGoToStep: (index: number) => void
}

const SetUpWizardStart = ({ currentStepIndex, lastInProgress, completedSteps, onGoToStep }: SetUpWizardStartProps) => {
  const { setUpWizardStepsMetadata } = useSetUpWizardStepsMetadata()

  return (
    <WizardContentWrapper minH="300px">
      <Flex
        h='full'
        justifyContent='space-between'
        w='full'
      >
        <SetUpWizardStartLeft hasStarted={completedSteps > 0} />

        <WizardStartRight
          completedSteps={completedSteps}
          currentStepIndex={currentStepIndex}
          h='350px'
          lastInProgress={lastInProgress}
          stepsList={setUpWizardStepsMetadata.stepsData}
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

export default SetUpWizardStart