// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdInfoOutline } from 'react-icons/md'
import { Box } from '@chakra-ui/react'

interface CommonTooltipProps {
    bg: string
    iconColor: string 
    label: string 
    size: string 
}

const CommonTooltip = ({ bg, iconColor, label, size }: CommonTooltipProps) => {
  return (
    <Box css={{ position: "relative", display: "inline-block" }}>
      <Box 
        as={MdInfoOutline} 
        aria-label="info tooltip"
        color={iconColor}
        tabIndex={0}
        css={{
          '&:hover + div': {
            display: 'block',
          }
        }}
      />
      <Box
        css={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: bg,
          fontFamily: 'Poppins',
          fontSize: size,
          fontWeight: '400',
          padding: '2px 8px',
          textAlign: 'center',
          width: '250px',
          borderRadius: 'md',
          zIndex: '9999',
          display: 'none',
          '&:after': {
            content: '""',
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '6px',
            borderStyle: 'solid',
            borderColor: `${bg} transparent transparent transparent`
          }
        }}
      >
        {label}
      </Box>
    </Box>
  )
}

export default CommonTooltip