import { Button, Flex } from '@chakra-ui/react'
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
      <Flex justifyContent='space-between' h='full' w='full'>
        <SetUpWizardStartLeft
          hasStarted={completedSteps > 0} />
        <WizardStartRight
          lastInProgress={lastInProgress}
          currentStepIndex={currentStepIndex}
          completedSteps={completedSteps}
          stepsList={setUpWizardStepsMetadata.stepsData}
          h='350px'
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

export default SetUpWizardStart