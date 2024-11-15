import { InfoIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'

interface CommonTooltipProps {
    bg: string
    iconColor: string 
    label: string 
    size: string 
}

const CommonTooltip = ({ bg, iconColor, label, size }: CommonTooltipProps) => {
  return (
    <div>
      <Tooltip 
        bg={bg} 
        fontSize={size}
        fontFamily='Open sans'
        fontWeight='400'
        padding='2px 8px'
        hasArrow
        placement='top'
        label={label}
        textAlign='center'
        h='auto'
        w='250px'>
        <InfoIcon 
          tabIndex={0}
          color={iconColor}
          aria-label="info tooltip"
          focusable="true" />
      </Tooltip>
    </div>
  )
}

export default CommonTooltip