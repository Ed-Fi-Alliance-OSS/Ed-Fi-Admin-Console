import {
  Flex, Heading 
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import useDebugOnBoardingWizard from '../../hooks/debug/useDebugOnBoardingWizard'
import useHelpLinks from '../../hooks/useHelpLinks'
import useOnBoardingWizard from '../../hooks/useOnBoardingWizard'
import useOnboardingWizardStepsData from '../../hooks/useOnBoardingWizardStepsData'
import ActionNavigationList from '../common/ActionNavigationList'
import ContentBlocker from '../common/ContentBlocker'
import OnBoardingWizardDebugMenu from '../common/Debug/OnBoardingWizardDebugMenu'
import ODSInstanceTableWrapper from '../common/ODS/ODSInstanceTableWrapper'
import OnBoardingWizardBanner from '../common/OnBoarding/OnBoardingWizardBanner'

const HomePageContent = () => {
  const { isOBActive, 
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
    <Flex
      flexDir='column'
      position='relative'
      w='full'
    >
      <OnBoardingWizardDebugMenu
        creatingStep={creatingStep}
        currentResetStep={currentResetStep}
        currentUpdateStep={currentUpdateStep}
        resetingAllSteps={updatingAllSteps}
        selectedStatus={selectedStepStatus}
        selectedStep={selectedStep}
        showTestingButtons={showTestingButtons}
        stepNumber={stepNumber}
        stepStatus={stepStatus}
        updatingStep={updatingStep}
        onChangeSelect={handleUpdateSelectedStep}
        onCreateOBStep={handleCreateOBStep}
        onResetAllOBSteps={handleResetOBSteps}
        onUpdateOBStep={handleUpdateOBStep}
      />

      {isOBActive() && <>
        <ContentBlocker />

        <Flex
          w='full'
          zIndex='2'
        >
          <OnBoardingWizardBanner 
            currentStepName={currentStepIndex > 0? onboardingStepsData.tabsData[currentStepIndex].tabName : onboardingStepsData.tabsData[0].tabName}
            currentStepNumber={currentStepIndex + 1}
            currentStepStatus={getCurrentStepStatus()}
            totalSteps={onboardingStepsData.stepsData.length}
          />
        </Flex>
      </>}

      <Heading
        mt={isOBActive()? '48px' : '16px'}
        size='lg'
      >Admin Actions
      </Heading>

      <ActionNavigationList />

      <Flex
        flexDir='column'
        mt='64px'
      >
        <Flex
          flexDir='column'
          my='32px'
          w='full'
        >
          <ODSInstanceTableWrapper
            pickedInstance={null}
            tableMode="Display"
            onSelectInstance={() => null}
            onUpdateInstancesCount={() => null}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HomePageContent