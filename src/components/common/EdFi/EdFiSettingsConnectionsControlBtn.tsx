import {
  Button, Flex 
} from '@chakra-ui/react'
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
    <Flex
      justifyContent='flex-end'
      w='auto'
    >
      <Button 
        borderRadius='4px'
        isDisabled={isDisabled}
        minW='39px'
        size='xs'
        variant='primaryBlue600'
        onClick={() => onEdit(connectionId)}
      >
        Edit
      </Button>

      { false && <EdFiConnectionControlPopover 
        connectionId={connectionId} 
        isDeleting={isDeleting} 
        isDisabled={false} 
        onDelete={() => null}
      /> }
    </Flex>
  )
}

export default EdFiSettingsConnectionsControlBtn