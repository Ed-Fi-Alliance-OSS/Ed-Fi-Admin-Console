import { Flex } from '@chakra-ui/react'
import { StepData } from '../../../core/onBoardingWizard/onBoardingWizard.types'
import WizardStepButton from './WizardStepButton'

interface WizardStartRightProps {
    completedSteps: number
    lastInProgress: number
    currentStepIndex: number 
    stepsList: StepData[]
    h?: string 
    onGoToStep: (index: number) => void
}

const WizardStartRight = ({ currentStepIndex, lastInProgress, completedSteps, stepsList, h, onGoToStep }: WizardStartRightProps) => {
  const isCurrent = (index: number) => {
    return index === lastInProgress
  }

  const isDisabled = (index: number) => {
    if (index === currentStepIndex || index === lastInProgress)
      return false

    if (index > completedSteps - 1)
      return true

    return false
  }   

  return (
    <Flex 
      flexDir='column'
      padding='0 32px'
      h={ h ?? '720px'}
      w='48%'>
      {stepsList.map((step, index) => 
        <WizardStepButton 
          isCurrent={isCurrent(index)}
          isDisabled={isDisabled(index)}
          key={index}
          stepData={step}
          onClick={onGoToStep} />
      )}
    </Flex>
  )
}

export default WizardStartRight