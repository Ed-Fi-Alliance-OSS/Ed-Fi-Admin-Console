import { Button, Flex } from "@chakra-ui/react"
import { ODSInstance } from "../../../core/ODSInstance.types"
import { UpdatingIsDefaultStatus } from "../../../hooks/odsInstances/useOdsInstanceTable.types"
import useRedirectToSetUpWizard from "../../../hooks/odsInstances/useRedirectToSetUpPage"
import SetUpInstanceControlBtnPopover from "./SetUpInstanceControlBtnPopover"

interface SetUpInstanceBtnProps {
    instance: ODSInstance
    updatingIsDefault: UpdatingIsDefaultStatus
    onOpenSetUpModal: (instanceId: string) => void
}

const SetUpInstanceBtn = ({ instance, updatingIsDefault, onOpenSetUpModal }: SetUpInstanceBtnProps) => {
    const { onRedirectToSetupWizard } = useRedirectToSetUpWizard()

    return (
        <Flex w='80px'>
            <Button 
                onClick={() => onRedirectToSetupWizard(instance)}
                isDisabled={updatingIsDefault.loading}
                borderRadius='4px 0px 0px 4px'
                variant='primaryBlue500'
                minW='67px'
                size='xs'>
                    Set Up
            </Button>
            <SetUpInstanceControlBtnPopover
                instance={instance}
                updatingIsDefault={updatingIsDefault}
                onOpenSetUpModal={onOpenSetUpModal} />
        </Flex>
    )
}

export default SetUpInstanceBtn