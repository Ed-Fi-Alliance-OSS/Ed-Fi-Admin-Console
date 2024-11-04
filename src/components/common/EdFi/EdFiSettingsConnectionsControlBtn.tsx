import { Button, Flex } from '@chakra-ui/react'
import { DeletingState } from '../../../core/deletingState.types'
import EdFiConnectionControlPopover from './EdFiConnectionControlPopover'

interface EdFiSettingsConnectionsControlBtnProps {
    connectionId: string
    isDisabled: boolean
    isDeleting: DeletingState
    onEdit: (connectionId: string) => void
}

const EdFiSettingsConnectionsControlBtn = ({ connectionId, isDeleting, isDisabled, onEdit }: EdFiSettingsConnectionsControlBtnProps) => {
  return (
    <Flex justifyContent='flex-end' w='auto'>
      <Button 
        onClick={() => onEdit(connectionId)}
        isDisabled={isDisabled}
        size='xs'
        borderRadius='4px'
        variant='primaryBlue600'
        minW='39px'>
                    Edit
      </Button>
      { false && <EdFiConnectionControlPopover 
        connectionId={connectionId} 
        isDisabled={false} 
        isDeleting={isDeleting} 
        onDelete={() => null} /> }
    </Flex>
  )
}

export default EdFiSettingsConnectionsControlBtn