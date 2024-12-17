import {
  Flex, Heading
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import routes from '../../core/routes'
import useDebugSetupWizard from '../../hooks/debug/useDebugSetupWizard'
import useOdsInstanceIdParam from '../../hooks/odsInstances/useOdsInstanceIdParam'
import useOdsInstanceDisplayYear from '../../hooks/odsInstances/useOdsInstanceYearName'
import useSetUpWizard from '../../hooks/setUpWizard/useSetUpWizard'
import useHelpLinks from '../../hooks/useHelpLinks'
import BackToLink from '../common/BackToLink'
import SetupWizardDebugMenu from '../common/Debug/SetupWizardDebugMenu'
import InstanceLoadingContent from '../common/Instance/InstanceLoadingContent'
import NeedHelpLinks from '../common/NeedHelpLinks'
import SetUpWizard from '../common/SetUpWizard/SetUpWizard'
import SetUpWizardStart from '../common/SetUpWizard/SetUpWizardStart'

const SetUpWizardPageContent = () => {
  const {
    instance,
    setUpWizardData,
    fetchingData,
    isFetchingSetUpWizard,
    completedSteps, 
    currentStepIndex,
    lastStep,
    onCompletedStep,
    onIncompletedStep,
    lastInProgress,
    handleNext,
    handleGoToStep,
    started,
    handlePrev,
    canNext,
    canPrev
  } = useSetUpWizard()

  const { getDisplayYear } = useOdsInstanceDisplayYear()
  const { getInstanceIdFromPath } = useOdsInstanceIdParam()
  const { getAdminActionHelpLinks } = useHelpLinks()
  const location = useLocation()

  const {
    showTestingButtons,
    updatingStep,
    updatingAllSteps,
    currentResetStep,
    currentUpdateStep,
    stepNumber,
    selectedStep,
    selectedStepStatus,
    handleUpdateSelectedStep,
    handleUpdateOBStep,
    handleResetOBSteps
  } = useDebugSetupWizard({ 
    instance,
    isDebug: location.search.includes('debug') 
  })

  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <SetupWizardDebugMenu
        currentResetStep={currentResetStep}
        currentUpdateStep={currentUpdateStep}
        resetingAllSteps={updatingAllSteps}
        selectedStatus={selectedStepStatus}
        selectedStep={selectedStep}
        showTestingButtons={showTestingButtons}
        stepNumber={stepNumber}
        updatingStep={updatingStep}
        onChangeSelect={handleUpdateSelectedStep}
        onResetAllOBSteps={handleResetOBSteps}
        onUpdateOBStep={handleUpdateOBStep}
      />

      <Flex justifyContent='space-between'>
        <BackToLink 
          text="Back to School Year List"
          url={routes.home.url}
        />

        <NeedHelpLinks 
          knowledgeBaseUrl={getAdminActionHelpLinks().knowledgeBaseUrl}
          supportUrl={getAdminActionHelpLinks().supportTicketUrl}
        />
      </Flex>

      { (fetchingData || isFetchingSetUpWizard) && !started && 
      <InstanceLoadingContent
        minH="500px"
        text="Setting up your environment. This may take a moment."
      /> }

      { instance && !fetchingData && !isFetchingSetUpWizard && <Flex 
        bg='blue.500'
        borderRadius='4px'
        flexDir='column'
        mt='10px'
        padding='49px 58px'
        w='full'
      >
        <Heading
          color='white'
          fontFamily='Poppins'
          fontSize='32px'
          fontWeight='700'
        >
          { instance && !fetchingData? `Let’s set up ${getDisplayYear(instance)}.` : 'Loading' }
        </Heading>

        <Flex
          mt='32px'
          w='full'
        >
          {started? 
            <SetUpWizard
              canNext={canNext()}
              canPrev={canPrev()}
              completedSteps={completedSteps}
              currentStepIndex={currentStepIndex}
              instance={instance}
              lastInProgress={lastInProgress}
              lastStep={lastStep}
              setupWizardData={setUpWizardData}
              onCompletedStep={onCompletedStep}
              onIncompletedStep={onIncompletedStep}
              onNext={handleNext}
              onPrev={handlePrev}
              onTabChange={handleGoToStep}
            /> : 
            <SetUpWizardStart
              completedSteps={completedSteps}
              currentStepIndex={currentStepIndex}
              lastInProgress={lastInProgress} 
              onGoToStep={handleGoToStep}
            />}
        </Flex>
      </Flex> }
    </Flex>
  )
}

export default SetUpWizardPageContent