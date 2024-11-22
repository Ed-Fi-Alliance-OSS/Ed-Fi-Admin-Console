import {
  Button, Text
} from '@chakra-ui/react'
import { StepData } from '../../../core/onBoardingWizard/onBoardingWizard.types'

interface OnBoardingWizardStepButtonProps {  
    isCurrent: boolean
    isDisabled: boolean 
    stepData: StepData
    onClick: (stepIndex: number) => void
}

const WizardStepButton = ({ isCurrent, isDisabled, stepData, onClick }: OnBoardingWizardStepButtonProps) => {
  return (
    <Button 
      _notFirst={{
        pt: '16px',
        pb: '16px' 
      }}
      _first={{ pb: '16px' }}
      alignItems='flex-start'
      bg='white'
      borderBottom='1px'
      borderBottomColor='gray.300'
      borderLeft='4px'
      borderLeftColor={isCurrent? 'blue.500' : 'gray.300'}
      borderRadius='0'
      display='flex'
      flexDir='column'
      h='100px'
      isDisabled={isDisabled}
      justifyContent='flex-start'
      minW='351px'
      paddingLeft='20px'
      onClick={() => onClick(stepData.index)}
    >
      <Text
        color={isCurrent? 'blue.500' : 'black'}
        fontFamily='Open sans'
        fontWeight='700'
        size='lg'
        whiteSpace='initial'
      >
        Step {stepData.index + 1}: {stepData.name}
      </Text>

      <Text
        color={isCurrent? 'blue.500' : 'black'}
        fontFamily='Open sans'
        fontWeight='400'
        mt='5px'
        size='sm'
        textAlign='start'
        whiteSpace='normal'
      >
        {stepData.description}
      </Text>
    </Button>
  )
}

export default WizardStepButton