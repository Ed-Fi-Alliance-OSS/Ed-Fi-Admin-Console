import { Button, Text } from "@chakra-ui/react"
import { StepData } from "../../../core/onBoardingWizard/onBoardingWizard.types"

interface OnBoardingWizardStepButtonProps {  
    isCurrent: boolean
    isDisabled: boolean 
    stepData: StepData
    onClick: (stepIndex: number) => void
}

const WizardStepButton = ({ isCurrent, isDisabled, stepData, onClick }: OnBoardingWizardStepButtonProps) => {
    return (
        <Button 
            display='flex'
            flexDir='column'
            alignItems='flex-start'
            isDisabled={isDisabled}
            justifyContent='flex-start'
            borderRadius='0'
            borderBottom='1px'
            borderBottomColor='gray.300'
            borderLeft='4px'
            borderLeftColor={ isCurrent? 'blue.500' : 'gray.300' }
            bg='white'
            h='100px'
            minW='351px'
            paddingLeft='20px'
            _notFirst={{ pt: '16px', pb: '16px' }}
            _first={{ pb: '16px' }}
            onClick={() => onClick(stepData.index)}>
                <Text
                    color={isCurrent? 'blue.500' : 'black'}
                    fontFamily='Open sans'
                    fontWeight='700'
                    whiteSpace='initial'
                    size='lg'>
                        Step {stepData.index + 1}: {stepData.name}
                </Text>
                <Text
                    color={isCurrent? 'blue.500' : 'black'}
                    fontFamily='Open sans'
                    fontWeight='400'
                    textAlign='start'
                    mt='5px'
                    whiteSpace='normal'
                    size='sm'>
                        {stepData.description}
                </Text>
        </Button>
    )
}

export default WizardStepButton