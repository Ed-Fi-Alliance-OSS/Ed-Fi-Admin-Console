// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Tooltip 
} from '@chakra-ui/react'
import { DeletingState } from '../../../core/deletingState.types'
import UserOrganizationsFormControlPopover from './UserOrganizationsFormControlPopover'

interface UserOrganizationsFormControlBtnProps {
    educationOrganizationId: string
    staffClassification: string
    isDeleting: DeletingState
    mode: 'add' | 'edit'
    source: string 
    isDisabled: boolean 
    index: number 
    onEdit: (educationOrganizationId: string, staffClassification: string, index: number) => void
    onDelete: (educationOrganizationId: string, staffClassification: string) => void 
    onCancelEdit: () => void
}

const UserOrganizationsFormControlBtn = ({ educationOrganizationId, staffClassification, source, isDeleting, isDisabled, index, onEdit, mode, onCancelEdit, onDelete }: UserOrganizationsFormControlBtnProps) => {
  const canModify = () => source === 'Manual'

  return (
    <Flex
      justifyContent='flex-end'
      w='auto'
    >
      <Tooltip
        hasArrow
        bg='blue.600'
        borderRadius='4px'
        isDisabled={canModify()}
        label='Cannot EDIT data from Ed-Fi'
      >
        <Button 
          borderRadius='4px 0px 0px 4px'
          color='primaryBlue600'
          disabled={!canModify() || isDisabled}
          fontSize='xs'
          minW='39px'
          variant='solid'
          onClick={() => onEdit(educationOrganizationId, staffClassification, index)}
        >
          Edit
        </Button>
      </Tooltip>

      <UserOrganizationsFormControlPopover 
        canDelete={canModify()} 
        educationOrganizationId={educationOrganizationId}
        isDeleting={isDeleting}
        isDisabled={isDisabled}
        staffClassification={staffClassification}
        onDelete={onDelete}
      />
    </Flex>
  )
}

export default UserOrganizationsFormControlBtn