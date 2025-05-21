// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdRefresh } from 'react-icons/md'
import {
  Button, Flex, Tooltip 
} from '@chakra-ui/react'
import { useState } from 'react'
import { system } from "../../theme";

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

  const onExecuteAction = async () => {
    await onAction()

    setTooltipMessage(refreshedMessage)
  }

  const onClose = () => {
    if (tooltipMessage === refreshedMessage) {
      setTooltipMessage(refreshMessage)
    }
  }
  // const spinAnimation = `${spin} infinite 2s linear`   

  if (asFlex) {
    return (
      <Tooltip 
        hasArrow
        bg={tooltipMessage === refreshMessage? 'blue.600' : 'green.700'}
        borderRadius='4px'
        closeOnClick={false} 
        display='flex' 
        justifyContent='center' 
        label={tooltipMessage} 
        placement='top' 
        w='140px'
        onClose={onClose}
      >
        <Button 
          aria-labelledby={`refresh-btn-${id}`}
          minW='auto'
          ml='10px'
          onClick={onExecuteAction}
        >
          <span
            hidden
            id={`refresh-btn-${id}`}
          >Refresh
          </span>

          <MdRefresh 
            aria-hidden="true" 
            color={iconColor ?? 'blue.600'}
            focusable='false'
            fontSize={fontSize ?? '20px'}
          />
        </Button>     
      </Tooltip>
    )
  }

  return (
    <Tooltip 
      hasArrow
      bg={tooltipMessage === refreshMessage? 'blue.600' : 'green.700'}
      borderRadius='4px'
      closeOnClick={false} 
      display='flex' 
      justifyContent='center' 
      label={tooltipMessage} 
      placement='top' 
      w='140px'
      onClose={onClose}
    >
      <Button 
        aria-labelledby={`refresh-btn-${id}`}
        minW='auto'
        ml='10px'
        variant='simple'
        onClick={onExecuteAction}
      >
        <span
          hidden
          id={`refresh-btn-${id}`}
        >Refresh
        </span>

        <MdRefresh 
          animation={isRefreshing? "spin" : 'none'}
          aria-label="refresh"
          color={iconColor ?? 'blue.600'}
          focusable='true'
          fontSize={fontSize ?? '20px'}
        />
      </Button>
    </Tooltip>
  )
}

export default RefreshBtn