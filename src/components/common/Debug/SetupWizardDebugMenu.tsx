import { Button, Flex, FormControl, Text } from "@chakra-ui/react"
import { CustomFormLabel, CustomSelect } from "@edwire/edx-portal-shared"
import { ChangeEvent } from "react"
import { OnBoardingStepStatus } from "../../../core/onBoardingWizard/onBoardingWizard.types"

interface SetupWizardDebugMenuProps {
    showTestingButtons: boolean 
    updatingStep: boolean 
    resetingAllSteps: boolean 
    currentUpdateStep: number
    currentResetStep: number 
    stepNumber: number 
    selectedStep: number 
    selectedStatus: OnBoardingStepStatus
    onChangeSelect: (e: ChangeEvent<HTMLSelectElement>) => void
    onResetAllOBSteps: () => void
    onUpdateOBStep: () => void
}

const stepOptions = () => {
    const options: any[] = []

    for (let i = 1; i <= 3; i++)
        options.push({ value: i, text: `Step ${i}` })

    return options
}   

const statusOptions = () => {
    const statusList: OnBoardingStepStatus[] = [
        "Completed",
        "InProgress",
        "Pending"
    ]

    const options: any[] = statusList.map(status => ({ value: status, text: status }))

    return options
}

const SetupWizardDebugMenu = ({ currentResetStep, currentUpdateStep, showTestingButtons, updatingStep, resetingAllSteps, selectedStatus, selectedStep, onChangeSelect, onResetAllOBSteps, onUpdateOBStep }: SetupWizardDebugMenuProps) => (
    <>
        {showTestingButtons && <Flex flexDir='column' w='full'>
            <FormControl zIndex={100}>
                <Flex flexDir='column'>
                    <CustomFormLabel
                        htmlFor="selectStep"
                        text="Select Step" />
                    <CustomSelect
                        id="selectStep"
                        value={selectedStep}
                        options={stepOptions()}
                        onChange={onChangeSelect} />
                </Flex>
                <Flex flexDir='column' mt='16px'>
                    <CustomFormLabel
                            htmlFor="selectStatus"
                            text="Select Status" />
                    <CustomSelect
                        id="selectStatus"
                        value={selectedStatus}
                        options={statusOptions()}
                        onChange={onChangeSelect}  />
                </Flex>
            </FormControl>
            <Flex alignItems='center' mb='10px' w='670'>
                <Button
                    onClick={onUpdateOBStep}
                    isLoading={updatingStep}
                    variant='primaryBlue600' size='sm' mb='10px' mt='16px' zIndex='100' w='300px'>
                        {selectedStep === 1? "Update Step 1" : `Update Steps from 1 to ${selectedStep} as ${selectedStatus}`} 
                </Button>
                {updatingStep && <Text ml='10px'>
                    Updating step: {currentUpdateStep}
                </Text>}
            </Flex>
            <Flex alignItems='center' mb='30px' w='650'>
                <Button
                    onClick={onResetAllOBSteps}
                    isLoading={resetingAllSteps}
                    variant='primaryBlue600' size='sm' zIndex='100' w='220px'>
                        Reset Onboarding Wizard
                </Button>
                {resetingAllSteps && <Text ml='10px'>
                    Updating step: {currentResetStep}
                </Text>}
            </Flex>
        </Flex>}
    </>
)

export default SetupWizardDebugMenu