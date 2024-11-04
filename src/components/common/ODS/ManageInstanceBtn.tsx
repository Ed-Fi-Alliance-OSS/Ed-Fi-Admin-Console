import { Button, Flex } from '@chakra-ui/react'
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
        onClick={() => navigate(getOdsInstanceLink(instance))}
        isDisabled={updatingIsDefault.loading}
        borderRadius='4px 0px 0px 4px'
        variant='primaryBlue600'
        minW='67px'
        size='xs'>
                    Manage
      </Button>
      <ManageInstanceControlBtnPopover
        instanceId={instance.instanceId}
        isDefault={instance.isDefault} 
        canSetAsDefault={canSetAsDefault}
        updatingIsDefault={updatingIsDefault}
        onOpenSetDefaultModal={onOpenSetDefaultModal} />
    </Flex>
  )
}

export default ManageInstanceBtn