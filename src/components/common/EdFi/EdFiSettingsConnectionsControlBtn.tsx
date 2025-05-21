// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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
        disabled={isDisabled}
        minW='39px'
        size='xs'
        color='primaryBlue600'
        variant={'solid'}
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