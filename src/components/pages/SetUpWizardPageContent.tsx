import { Flex, Heading } from '@chakra-ui/react'
import routes from '../../core/routes'
import useOdsInstanceDisplayYear from '../../hooks/odsInstances/useOdsInstanceYearName'
import useSetUpWizard from '../../hooks/setUpWizard/useSetUpWizard'
import useHelpLinks from '../../hooks/useHelpLinks'
import BackToLink from '../common/BackToLink'
import NeedHelpLinks from '../common/NeedHelpLinks'
import SetUpWizard from '../common/SetUpWizard/SetUpWizard'
import SetUpWizardStart from '../common/SetUpWizard/SetUpWizardStart'
import InstanceLoadingContent from '../common/Instance/InstanceLoadingContent'
import { useLocation } from 'react-router-dom'
import useDebugSetupWizard from '../../hooks/debug/useDebugSetupWizard'
import SetupWizardDebugMenu from '../common/Debug/SetupWizardDebugMenu'
import useOdsInstanceParamYear from '../../hooks/odsInstances/useOdsInstanceParamYear'

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
  const { getInstanceYearFromPathName } = useOdsInstanceParamYear()
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
    year: getInstanceYearFromPathName(),
    isDebug: location.search.includes('debug') 
  })

  return (
    <Flex flexDir='column' w='full'>
      <SetupWizardDebugMenu
        currentResetStep={currentResetStep}
        currentUpdateStep={currentUpdateStep}
        showTestingButtons={showTestingButtons}
        updatingStep={updatingStep}
        stepNumber={stepNumber}
        selectedStep={selectedStep}
        selectedStatus={selectedStepStatus}
        resetingAllSteps={updatingAllSteps}
        onChangeSelect={handleUpdateSelectedStep}
        onUpdateOBStep={handleUpdateOBStep}
        onResetAllOBSteps={handleResetOBSteps} />
      <Flex justifyContent='space-between'>
        <BackToLink 
          url={routes.home.url}
          text="Back to School Year List" />
        <NeedHelpLinks 
          knowledgeBaseUrl={getAdminActionHelpLinks().knowledgeBaseUrl}
          supportUrl={getAdminActionHelpLinks().supportTicketUrl} />
      </Flex>
      { (fetchingData || isFetchingSetUpWizard) && !started && 
                <InstanceLoadingContent
                  text="Setting up your environment. This may take a moment."
                  minH="500px" /> }
      { instance && !fetchingData && !isFetchingSetUpWizard && <Flex 
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
          fontSize='32px'>
          { instance && !fetchingData? `Let’s set up ${getDisplayYear(instance)}.` : 'Loading' }
        </Heading>
        <Flex mt='32px' w='full'>
          {started? 
            <SetUpWizard
              instance={instance}
              setupWizardData={setUpWizardData}
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
            <SetUpWizardStart
              currentStepIndex={currentStepIndex}
              lastInProgress={lastInProgress}
              completedSteps={completedSteps} 
              onGoToStep={handleGoToStep} />}
        </Flex>
      </Flex> }
    </Flex>
  )
}

export default SetUpWizardPageContent