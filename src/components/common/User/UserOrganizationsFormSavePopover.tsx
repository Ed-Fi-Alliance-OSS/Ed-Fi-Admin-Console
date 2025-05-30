// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdKeyboardArrowDown } from 'react-icons/md'
import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/react'

interface UserOrganizationsFormSavePopoverProps {
    onCancelAdd: () => void
}

const UserOrganizationsFormSavePopover = ({ onCancelAdd }: UserOrganizationsFormSavePopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button 
          aria-labelledby="show-save-option}"
          borderRadius='0px 4px 4px 0px'
          color='primaryBlue600'
          fontSize='xs'
          maxW='24px'
          minW='24px'
          ml='1px'
          variant='solid'
          onClick={() => console.log('User education organizations control popover')}
        >
          <span
            hidden
            id="show-save-option}"
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
        padding='0'
        top='0px'
        w='100px'
      >
        <PopoverBody padding='0'>
          <Flex 
            bg='white'
            border='1px'
            borderColor='gray.400'
            borderRadius='4px'
            w='100px'
          >
            <Button
              _hover={{ background: 'white' }}
              bg='white'
              borderRadius='4px'
              color='black'
              display='flex'
              fontFamily='Poppins'
              fontSize='xs'
              loading={false}
              minW='80px'
              onClick={onCancelAdd}
            >
              Cancel
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default UserOrganizationsFormSavePopover