// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdInfoOutline } from 'react-icons/md'
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
        hasArrow 
        bg={bg}
        fontFamily='Poppins'
        fontSize={size}
        fontWeight='400'
        h='auto'
        label={label}
        padding='2px 8px'
        placement='top'
        textAlign='center'
        w='250px'
      >
        <MdInfoOutline 
          aria-label="info tooltip"
          color={iconColor}
          focusable="true"
          tabIndex={0}
        />
      </Tooltip>
    </div>
  )
}

export default CommonTooltip