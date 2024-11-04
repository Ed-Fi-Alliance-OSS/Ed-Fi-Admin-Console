import { Flex, Heading } from '@chakra-ui/react'
import useOnBoardingWizard from '../../hooks/useOnBoardingWizard'
import ActionNavigationList from '../common/ActionNavigationList'
import ContentBlocker from '../common/ContentBlocker'
import ODSInstanceTableWrapper from '../common/ODS/ODSInstanceTableWrapper'
import OnBoardingWizardBanner from '../common/OnBoarding/OnBoardingWizardBanner'
import useDebugOnBoardingWizard from '../../hooks/debug/useDebugOnBoardingWizard'
import { useLocation } from 'react-router-dom'
import OnBoardingWizardDebugMenu from '../common/Debug/OnBoardingWizardDebugMenu'
import NeedHelpLinks from '../common/NeedHelpLinks'
import useHelpLinks from '../../hooks/useHelpLinks'
import useOnboardingWizardStepsData from '../../hooks/useOnBoardingWizardStepsData'

const HomePageContent = () => {
  const { 
    isOBActive, 
    currentStepIndex, 
    getCurrentStepStatus } = useOnBoardingWizard()
  const { onboardingStepsData } = useOnboardingWizardStepsData()
  const location = useLocation()

  const {
    showTestingButtons,
    creatingStep,
    updatingStep,
    updatingAllSteps,
    currentResetStep,
    currentUpdateStep,
    stepNumber,
    stepStatus,
    selectedStep,
    selectedStepStatus,
    handleUpdateSelectedStep,
    handleCreateOBStep,
    handleUpdateOBStep,
    handleResetOBSteps
  } = useDebugOnBoardingWizard({ isDebug: location.search.includes('debug') })

  const { getAdminActionHelpLinks } = useHelpLinks()

  return (
    <Flex position='relative' flexDir='column' w='full'>
      <OnBoardingWizardDebugMenu
        currentResetStep={currentResetStep}
        currentUpdateStep={currentUpdateStep}
        showTestingButtons={showTestingButtons}
        creatingStep={creatingStep}
        updatingStep={updatingStep}
        stepNumber={stepNumber}
        stepStatus={stepStatus}
        selectedStep={selectedStep}
        selectedStatus={selectedStepStatus}
        resetingAllSteps={updatingAllSteps}
        onChangeSelect={handleUpdateSelectedStep}
        onCreateOBStep={handleCreateOBStep}
        onUpdateOBStep={handleUpdateOBStep}
        onResetAllOBSteps={handleResetOBSteps} />
      {isOBActive() && <>
        <ContentBlocker />
        <Flex w='full' zIndex='2'>
          <OnBoardingWizardBanner 
            currentStepStatus={getCurrentStepStatus()}
            currentStepName={currentStepIndex > 0? onboardingStepsData.tabsData[currentStepIndex].tabName : onboardingStepsData.tabsData[0].tabName}
            currentStepNumber={currentStepIndex + 1}
            totalSteps={onboardingStepsData.stepsData.length} />
        </Flex>
      </>}
      <Heading size='lg' mt={isOBActive()? '48px' : '16px'}>Admin Actions</Heading>
      <ActionNavigationList />
      <Flex alignItems='flex-end' mt='16px' w='auto' ml='auto'>
        <NeedHelpLinks 
          knowledgeBaseUrl={getAdminActionHelpLinks().knowledgeBaseUrl} 
          supportUrl={getAdminActionHelpLinks().supportTicketUrl} />
      </Flex>
      <Flex flexDir='column' mt='64px'>
        <Flex flexDir='column' my='32px' w='full'>
          <ODSInstanceTableWrapper
            pickedInstance={null}
            tableMode="Display"
            onSelectInstance={() => null}
            onUpdateInstancesCount={() => null} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HomePageContent