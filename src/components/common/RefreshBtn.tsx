import { RepeatIcon } from '@chakra-ui/icons'
import { Button, Flex, keyframes, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'

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
    if (tooltipMessage === refreshedMessage)
      setTooltipMessage(refreshMessage)
  }

  const spin = keyframes`  
        from {transform: rotate(0deg);}   
        to {transform: rotate(360deg)} 
    `

  const spinAnimation = `${spin} infinite 2s linear`   

  if (asFlex) {
    return (
      <Tooltip 
        display='flex'
        justifyContent='center'
        borderRadius='4px'
        label={tooltipMessage} 
        hasArrow 
        bg={tooltipMessage === refreshMessage? 'blue.600' : 'green.700'} 
        placement='top' 
        closeOnClick={false} 
        onClose={onClose}
        w='140px'>
        <Button 
          onClick={onExecuteAction}
          ml='10px'
          minW='auto'
          aria-labelledby={`refresh-btn-${id}`}>
          <span id={`refresh-btn-${id}`} hidden>Refresh</span>
          <RepeatIcon 
            color={iconColor ?? 'blue.600'} 
            fontSize={fontSize ?? '20px'}
            focusable='false'
            aria-hidden="true" />
        </Button>     
      </Tooltip>
    )
  }

  return (
    <Tooltip 
      display='flex'
      justifyContent='center'
      borderRadius='4px'
      label={tooltipMessage} 
      hasArrow 
      bg={tooltipMessage === refreshMessage? 'blue.600' : 'green.700'} 
      placement='top' 
      closeOnClick={false} 
      onClose={onClose}
      w='140px'>
      <Button 
        onClick={onExecuteAction}
        variant='simple'
        ml='10px'
        minW='auto'
        aria-labelledby={`refresh-btn-${id}`}>
        <span id={`refresh-btn-${id}`} hidden>Refresh</span>
        <RepeatIcon 
          animation={isRefreshing? spinAnimation : 'none'}
          color={iconColor ?? 'blue.600'}
          fontSize={fontSize ?? '20px'}
          focusable='true'
          aria-label="refresh" />
      </Button>
    </Tooltip>
  )
}

export default RefreshBtn