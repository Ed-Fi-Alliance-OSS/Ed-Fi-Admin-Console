// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdKeyboardArrowDown } from 'react-icons/md'
import {
  Box,
  Button,
  Flex,
} from '@chakra-ui/react'
import { DeletingState } from '../../../core/deletingState.types'
import { useState } from 'react'

interface EdFiConnectionControlPopoverProps {
    connectionId: string 
    isDisabled: boolean
    isDeleting: DeletingState
    onDelete: () => null
}

const EdFiConnectionControlPopover = ({ connectionId, isDeleting, isDisabled, onDelete }: EdFiConnectionControlPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box position="relative">
      <Button 
        aria-labelledby={`show-options-${connectionId}`}
        disabled={isDisabled}
        aria-expanded={isOpen}
        css={{
          borderRadius: '0px 4px 4px 0px',
          maxWidth: '24px',
          minWidth: '24px',
          marginLeft: '1px',
          fontSize: 'xs',
          background: '#0066cc',
          color: 'white',
          padding: '0',
          '&:hover:not(:disabled)': {
            background: '#0055aa'
          },
          '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed'
          },
          '&:focus': {
            boxShadow: 'none'
          }
        }}
        onClick={() => {
          console.log('Ed-Fi connection control popover');
          setIsOpen(!isOpen);
        }}
      >
        <span
          hidden
          id={`show-options-${connectionId}`}
        >Show Options
        </span>

        <Box 
          as={MdKeyboardArrowDown}
          aria-hidden="true"    
          css={{
            fontSize: '18px'
          }}
        />
      </Button>

      {isOpen && (
        <Box
          css={{
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 1000,
            width: '100px',
            padding: 0
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Flex 
            css={{
              background: 'white',
              border: '1px solid',
              borderColor: 'gray.400',
              borderRadius: '4px',
              flexDirection: 'column',
              width: '100px',
              padding: 0
            }}
          >
            <Button
              css={{
                background: 'white',
                borderRadius: '4px',
                color: '#e53e3e', // red.600
                display: 'flex',
                fontFamily: 'Poppins',
                minWidth: '80px',
                fontSize: 'xs',
                padding: '8px',
                '&:hover': {
                  background: 'white'
                },
                position: 'relative',
                '&::before': isDeleting.deleting && isDeleting.id === connectionId ? {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  width: '12px',
                  height: '12px',
                  marginTop: '-6px',
                  border: '2px solid #e53e3e',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                } : {}
              }}
              onClick={onDelete}
            >
              {isDeleting.deleting && isDeleting.id === connectionId ? 
                <Box as="span" css={{ marginLeft: '20px' }}>Deleting...</Box> : 
                'Delete'
              }
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  )
}
export default EdFiConnectionControlPopover