import { Button, Flex, Heading, Img, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { Link } from "@chakra-ui/react"
import routes from "../../../core/routes"
import getAppScope from "../../../helpers/getAppScope"
import { OnBoardingStepStatus } from "../../../core/onBoardingWizard/onBoardingWizard.types"

interface OnBoardingWizardBannerProps {
    currentStepStatus: OnBoardingStepStatus
    currentStepName: string 
    currentStepNumber: number 
    totalSteps: number
}   

const OnBoardingWizardBanner = ({ currentStepStatus, currentStepName, currentStepNumber, totalSteps }: OnBoardingWizardBannerProps) => {
    // console.log("banner current step number", currentStepNumber, currentStepStatus)

    const showStepsProgress = () => {
        if (currentStepNumber > 1)
            return true
        
        if (currentStepNumber === 1 && currentStepStatus !== 'Pending')
            return true

        return false
    }

    return (
        <Flex 
            bg='blue.500'
            borderRadius='4px'
            alignItems='center'
            padding='50px 65px'
            position='relative'
            justifyContent='space-between'
            overflow='hidden'
            h='241px'
            w='full'>
                <Flex flexDir='column'>
                    <Heading
                        color='white'
                        fontFamily='Poppins'
                        fontWeight='700'
                        fontSize='32px'
                        lineHeight='42px'>
                            { showStepsProgress()? 'Let’s finish your setup.' : 'Welcome to The Exchange! Let’s get set up.'}
                    </Heading>
                    {showStepsProgress() && <Flex alignItems='center' mt='16px'>
                        <Text
                            color='white'
                            fontFamily='Open sans'
                            fontWeight='400'
                            size='sm'>
                                {`You're on Step ${currentStepNumber} of ${totalSteps}: `}
                        </Text>
                        <Text
                            color='white'
                            fontFamily='Open sans'
                            fontWeight='700'
                            ml='5px'>
                                {currentStepName}
                        </Text>
                    </Flex>}
                </Flex>
                <Button 
                    display='flex'
                    bg='white'
                    size='lg'
                    variant='primaryWhite'
                    padding='0'
                    ml='87px'
                    w='198px'
                    textDecor='none'
                    zIndex={2}
                    data-testid="start-ob-btn"
                    alignItems='center'
                    justifyContent='center'
                    textDecoration='none'
                    as={RouterLink} 
                    to={routes.onBoardingWizard.url}>
                        {currentStepNumber === 1? 'Start Setup' : 'Continue'}
                </Button>
                <Img 
                    position='absolute'
                    src={`${getAppScope()}/assets/exchange-symbol-03.svg`}
                    w='380px'
                    top='-155px'
                    right='-60px'
                    alt="exchange-symbol" />
        </Flex>
    )
}

export default OnBoardingWizardBanner