import { Button, Flex, Link, Text, Tooltip } from "@chakra-ui/react"
import {MdHelpOutline} from 'react-icons/md'
import useHelpLinks from "../../../hooks/useHelpLinks"
import WizardContentWrapper from "../Wizard/WizardContentWrapper"

interface OnBoardingTabsWrapperProps {
    children: JSX.Element
    stepName: string 
    currentStep: number
    lastStep: number
    canPrev: boolean 
    canNext: boolean
    onPrev: () => void
    onNext: () => void
}

const OnBoardingTabsWrapper = ({ children, stepName, currentStep, lastStep, canNext, canPrev, onNext, onPrev }: OnBoardingTabsWrapperProps) => {
    const { getOnboardingWizardHelpLinks } = useHelpLinks()
    const getCurrentStepHelpLink = () => {
        const links = getOnboardingWizardHelpLinks()

        // console.log('links', links, links[currentStep -1].knowledgeBaseUrl)

        return links[currentStep -1].knowledgeBaseUrl
    }

    return (
        <WizardContentWrapper>
                <Flex flexDir='column' w='full'>
                    <Text   
                        color='gray.500'
                        fontFamily='Open sans'
                        fontWeight='400'
                        size='sm'>
                            Step {currentStep} of {lastStep}
                    </Text>
                    <Flex alignItems='center'>
                        <Text
                            display='flex'
                            alignItems='center'
                            fontFamily='Poppins'
                            fontWeight='700'
                            position='relative'
                            fontSize='32px'>
                                {currentStep === lastStep? 'Review and Finalize' : stepName}
                        </Text>
                        <Tooltip label='Get Help Here' ml='5px' hasArrow bg='blue.700' borderRadius='4px' placement="top">
                            <span style={{ marginLeft: '5px' }}>
                                <Link
                                    href={getCurrentStepHelpLink()}
                                    target='_blank'
                                    id="help link"
                                    referrerPolicy="no-referrer"
                                    aria-label="help link">
                                        <MdHelpOutline 
                                            fontSize='25px'
                                            height='15px'
                                            width='15px'
                                            aria-label="help link"
                                            focusable="true" />
                                </Link>
                            </span>
                        </Tooltip>
                    </Flex>
                </Flex>
                <Flex mt='32px' w='full'>
                    {children}
                </Flex>
                <Flex mt='auto' w='full'>
                    <Flex justifyContent='space-between' mt='32px' w='full'>
                        <Button
                            onClick={onPrev}
                            border='1px'
                            variant='secondaryBlue600'
                            size='lg'
                            isDisabled={!canPrev}
                            minW='175PX'>
                                Previous
                        </Button>
                        <Button
                            onClick={onNext}
                            variant={ currentStep === lastStep? 'primaryGreen500' : 'primaryBlue600'}
                            bg={ currentStep === lastStep? 'green.600' : 'blue.600' }
                            size='lg'
                            isDisabled={!canNext}
                            minW='138px'
                            _hover={{ backgroundColor: currentStep === lastStep? 'green.600' : (canNext? 'blue.900' : 'blue.600') }}>
                                {currentStep === lastStep? 'Finalize' : 'Next'}
                        </Button>
                    </Flex>
                </Flex> 
        </WizardContentWrapper>
    )
}

export default OnBoardingTabsWrapper