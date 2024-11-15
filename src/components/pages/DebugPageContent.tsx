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
    </Flex>
  )
}

export default DebugPageContent