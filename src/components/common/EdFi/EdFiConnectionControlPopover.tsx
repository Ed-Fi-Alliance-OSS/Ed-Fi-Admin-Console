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
import { DeletingState } from '../../../core/deletingState.types'

interface EdFiConnectionControlPopoverProps {
    connectionId: string 
    isDisabled: boolean
    isDeleting: DeletingState
    onDelete: () => null
}

const EdFiConnectionControlPopover = ({ connectionId, isDeleting, isDisabled, onDelete }: EdFiConnectionControlPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button 
          aria-labelledby={`show-options-${connectionId}`}
          borderRadius='0px 4px 4px 0px'
          isDisabled={isDisabled}
          maxW='24px'
          minW='24px'
          ml='1px'
          size='xs'
          variant='primaryBlue600'
          onClick={() => console.log('Ed-Fi connection control popover')}
        >
          <span
            hidden
            id={`show-options-${connectionId}`}
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
            flexDir='column'
            w='100px'
          >
            <Button
              _hover={{ background: 'white' }}
              bg='white'
              borderRadius='4px'
              color='red.600'
              display='flex'
              fontFamily='Poppins'
              isLoading={isDeleting.deleting && isDeleting.id === connectionId}
              minW='80px'
              size='xs'
              onClick={onDelete}
            >
              Delete
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default EdFiConnectionControlPopover