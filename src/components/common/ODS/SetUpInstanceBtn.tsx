import {
  Button, Flex 
} from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import { UpdatingIsDefaultStatus } from '../../../hooks/odsInstances/useOdsInstanceTable.types'
import useRedirectToSetUpWizard from '../../../hooks/odsInstances/useRedirectToSetUpPage'
import SetUpInstanceControlBtnPopover from './SetUpInstanceControlBtnPopover'

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
        borderRadius='4px 0px 0px 4px'
        isDisabled={updatingIsDefault.loading}
        minW='67px'
        size='xs'
        variant='primaryBlue500'
        onClick={() => onRedirectToSetupWizard(instance)}
      >
        Set Up
      </Button>

      <SetUpInstanceControlBtnPopover
        instance={instance}
        updatingIsDefault={updatingIsDefault}
        onOpenSetUpModal={onOpenSetUpModal}
      />
    </Flex>
  )
}

export default SetUpInstanceBtn