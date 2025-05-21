// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdKeyboardArrowDown } from 'react-icons/md'
import {
  Button, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger
} from '@chakra-ui/react'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import {
  AppUser, AppUserSource, AppUserStatus
} from '../../../core/AppUser.types'
import { InvitationStatus } from '../../../core/invitations/Invitation.types'

interface ManageUserControlPopoverProps {
    userId: string
    user: AppUser
    status: AppUserStatus | InvitationStatus
    isDeleting: boolean
    isDeletingInvitation: boolean 
    onDeleteInvitation: (invitationId: string) => void
    onDelete: (userId: string) => void
    onActivate: (userId: string) => void
    onDeactivate: (userId: string) => void
    onEditInvitation: (user: AppUser) => void
}

const ManageUserControlPopover = ({ userId, user, status, isDeleting, isDeletingInvitation, onDeleteInvitation, onActivate, onEditInvitation, onDeactivate, onDelete }: ManageUserControlPopoverProps) => {
  const adminConfig = useContext(adminConsoleContext)

  const showDeleteBtn = () => {
    if ((adminConfig && adminConfig.showUserDelete)) {
      return true
    }

    return false
  }

  const showEditInvitationBtn = () => {
    return false
  }

  const selectBorderRadius = () => {
    return '0px 4px 4px 0px'
  }

  const isDisabled = (source: AppUserSource | null) => {
    if (source === 'Manual' || source === null) {
      return false
    }

    return true
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button 
          aria-labelledby={`show-options-${userId}`}
          borderRadius={selectBorderRadius()}
          maxW='24px'
          minW='24px'
          ml='1px'
          fontSize='xs'
          variant='solid'
          color='primaryBlue600'
          onClick={() => console.log('manage user control popover')}
        >
          <span
            hidden
            id={`show-options-${userId}`}
          >Show Options
          </span>

          <MdKeyboardArrowDown 
            aria-hidden="true"    
            focusable="false" 
            fontSize='18px'
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent 
        aria-label={`options-${userId}`}
        padding='0'
        top='0px'
        w='auto'
      >
        <PopoverBody padding='10px'>
          <Flex
            flexDir='column'
            w='auto'
          >
            {status === 'Active' && <Button
              color='black'
              display='flex'
              fontFamily='Poppins'
              fontWeight='400'
              justifyContent='start'
              minW='auto'
              padding='0'
              textAlign='start'
              onClick={() => onDeactivate(userId)}
            >
              Mark as Inactive
            </Button>}

            {status === 'Inactive' && <Button 
              color='black'
              display='flex'
              fontFamily='Poppins'
              fontWeight='400'
              justifyContent='start'
              padding='0'
              textAlign='start'
              onClick={() => onActivate(userId)}
            > 
              Mark as Active
            </Button>}

            {showEditInvitationBtn() && <Button
              _disabled={{ opacity: 0.4 }}
              color="gray.600"
              display='flex'
              fontFamily='Poppins'
              fontWeight='400'
              justifyContent='start'
              minW='30px'
              padding='0'
              fontSize='xs'
              textAlign='start'
              w='auto'
              onClick={() => onEditInvitation(user)}
            >
              Edit
            </Button>}

            {showDeleteBtn() && <Button
              _disabled={{ opacity: 0.4 }}
              color="red.600"
              display='flex'
              fontFamily='Poppins'
              fontWeight='400'
              loading={isDeleting}
              justifyContent='start'
              minW='30px'
              padding='0'
              fontSize='xs'
              textAlign='start'
              w='auto'
              onClick={() => onDelete(userId)}
            >
              Delete
            </Button>}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ManageUserControlPopover