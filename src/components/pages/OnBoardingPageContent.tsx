import { Flex, Heading } from "@chakra-ui/react"
import OnBoardingWizard from "../common/OnBoarding/OnBoardingWizard"
import OnBoardingWizardStart from '../common/OnBoarding/OnBoardingWizardStart'
import BackToLink from '../common/BackToLink'
import routes from '../../core/routes'
import useOnBoardingWizard from '../../hooks/useOnBoardingWizard'
import NeedHelpLinks from "../common/NeedHelpLinks"
import useHelpLinks from "../../hooks/useHelpLinks"

const OnBoardingPageContent = () => {
    const { 
        started, 
        completedSteps, 
        currentStepIndex,
        lastStep,
        onCompletedStep,
        onIncompletedStep,
        lastInProgress,
        handleNext,
        handleGoToStep,
        handlePrev,
        canNext,
        canPrev } = useOnBoardingWizard()

    const { getAdminActionHelpLinks } = useHelpLinks()

    return (
        <Flex flexDir='column' w='full'>
            <Flex justifyContent='space-between'>
                <BackToLink 
                    url={routes.home.url}
                    text="Finish later" />
                <NeedHelpLinks 
                    knowledgeBaseUrl={getAdminActionHelpLinks().knowledgeBaseUrl}
                    supportUrl={getAdminActionHelpLinks().supportTicketUrl} />
            </Flex>
            <Flex 
                bg='blue.500'
                flexDir='column'
                borderRadius='4px'
                padding='49px 58px'
                mt='10px'
                w='full'>
                    <Heading
                        color='white'
                        fontFamily='Poppins'
                        fontWeight='700'
                        fontSize='32px'>Let’s get set up.</Heading>
                    <Flex mt='32px' w='full'>
                        {started? 
                            <OnBoardingWizard
                                completedSteps={completedSteps}
                                currentStepIndex={currentStepIndex}
                                lastInProgress={lastInProgress}
                                lastStep={lastStep}
                                onCompletedStep={onCompletedStep}
                                onIncompletedStep={onIncompletedStep}
                                onNext={handleNext}
                                onPrev={handlePrev}
                                onTabChange={handleGoToStep}
                                canNext={canNext()}
                                canPrev={canPrev()} /> : 
                            <OnBoardingWizardStart
                                currentStepIndex={currentStepIndex}
                                lastInProgress={lastInProgress}
                                completedSteps={completedSteps} 
                                onGoToStep={handleGoToStep} />}
                    </Flex>
            </Flex>
        </Flex>
    )
}

export default OnBoardingPageContent