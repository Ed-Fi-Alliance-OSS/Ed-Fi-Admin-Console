import { Flex } from '@chakra-ui/react'
import useDebugOnBoardingWizard from '../../hooks/debug/useDebugOnBoardingWizard'
import OnBoardingWizardDebugMenu from '../common/Debug/OnBoardingWizardDebugMenu'

const DebugPageContent = () => {
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
  } = useDebugOnBoardingWizard({ isDebug: true })

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
    </Flex>
  )
}

export default DebugPageContent