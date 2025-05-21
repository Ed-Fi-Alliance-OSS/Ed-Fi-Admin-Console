// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdRefresh } from 'react-icons/md'
import {
  Box, Button,
} from '@chakra-ui/react'
import { useState } from 'react'
import { system } from '../../theme'

interface RefreshBtnProps {
    id: string
    fontSize?: string
    asFlex?: boolean 
    isRefreshing?: boolean 
    iconColor?: string 
    onAction: () => Promise<void> | void
}

const refreshMessage = 'Click to refresh.'
const refreshedMessage = 'Refreshed!'

const RefreshBtn = ({ id, fontSize, asFlex, isRefreshing, iconColor, onAction }: RefreshBtnProps) => {
  const [ tooltipMessage, setTooltipMessage ] = useState(refreshMessage)
  const [ isOpen, setIsOpen ] = useState(false)

  const onExecuteAction = async () => {
    await onAction()
    setTooltipMessage(refreshedMessage)
    setIsOpen(true)
    // Hide tooltip after 2 seconds
    setTimeout(() => {
      setIsOpen(false)
    }, 2000)
  }

  const onClose = () => {
    if (tooltipMessage === refreshedMessage) {
      setTooltipMessage(refreshMessage)
    }
  }

  if (asFlex) {
    return (
      <Box position="relative" display="inline-block">
        <Button 
          aria-labelledby={`refresh-btn-${id}`}
          css={{
            minWidth: 'auto',
            marginLeft: '10px',
            background: 'transparent',
            padding: '8px',
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.05)'
            },
            '&:focus': {
              boxShadow: 'none'
            }
          }}
          onClick={onExecuteAction}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <span
            hidden
            id={`refresh-btn-${id}`}
          >Refresh
          </span>

          <Box
            as={MdRefresh}
            aria-hidden="true"
            color={iconColor ?? 'blue.600'}
            css={{
              fontSize: fontSize ?? '20px'
            }}
          />
        </Button>
        
        {/* Custom tooltip */}
        {isOpen && (
          <Box
            css={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: tooltipMessage === refreshMessage ? 'blue.600' : 'green.700',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              width: '140px',
              textAlign: 'center',
              fontSize: '14px',
              zIndex: 1000,
              '&:after': {
                content: '""',
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                border: '5px solid transparent',
                borderTopColor: tooltipMessage === refreshMessage ? 'blue.600' : 'green.700'
              }
            }}
          >
            {tooltipMessage}
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box position="relative" display="inline-block">
      <Button 
        aria-labelledby={`refresh-btn-${id}`}
        css={{
          minWidth: 'auto',
          marginLeft: '10px',
          background: 'transparent',
          padding: '8px',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.05)'
          },
          '&:focus': {
            boxShadow: 'none'
          }
        }}
        onClick={onExecuteAction}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span
          hidden
          id={`refresh-btn-${id}`}
        >Refresh
        </span>

        <Box
          as={MdRefresh}
          aria-hidden="true"
          color={iconColor ?? 'blue.600'}
          css={{
            fontSize: fontSize ?? '20px',
            animation: isRefreshing ? 'spin 1s linear infinite' : 'none'
          }}
        />
      </Button>
      
      {/* Custom tooltip */}
      {isOpen && (
        <Box
          css={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: tooltipMessage === refreshMessage ? 'blue.600' : 'green.700',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            width: '140px',
            textAlign: 'center',
            fontSize: '14px',
            zIndex: 1000,
            '&:after': {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              border: '5px solid transparent',
              borderTopColor: tooltipMessage === refreshMessage ? 'blue.600' : 'green.700'
            }
          }}
        >
          {tooltipMessage}
        </Box>
      )}
    </Box>
  )
}

export default RefreshBtn