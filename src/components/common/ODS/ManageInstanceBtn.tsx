import {
  Button, Flex 
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useOdsInstanceLink from '../../../hooks/odsInstances/useOdsInstanceLink'
import { UpdatingIsDefaultStatus } from '../../../hooks/odsInstances/useOdsInstanceTable.types'
import ManageInstanceControlBtnPopover from './ManageInstanceControlBtnPopover'

interface ManageInstanceBtnProps {
    instance: ODSInstance
    updatingIsDefault: UpdatingIsDefaultStatus
    canSetAsDefault: boolean 
    onOpenSetDefaultModal: (instanceId: string) => void
}

const ManageInstanceBtn = ({ instance, canSetAsDefault, updatingIsDefault, onOpenSetDefaultModal }: ManageInstanceBtnProps) => {
  const { getOdsInstanceLink } = useOdsInstanceLink()
  const navigate = useNavigate()

  return (
    <Flex w='80px'>
      <Button 
        borderRadius='4px 0px 0px 4px'
        isDisabled={updatingIsDefault.loading}
        minW='67px'
        size='xs'
        variant='primaryBlue600'
        onClick={() => navigate(getOdsInstanceLink(instance))}
      >
        Manage
      </Button>

      <ManageInstanceControlBtnPopover
        canSetAsDefault={canSetAsDefault}
        instanceId={instance.instanceId} 
        isDefault={instance.isDefault}
        updatingIsDefault={updatingIsDefault}
        onOpenSetDefaultModal={onOpenSetDefaultModal}
      />
    </Flex>
  )
}

export default ManageInstanceBtn