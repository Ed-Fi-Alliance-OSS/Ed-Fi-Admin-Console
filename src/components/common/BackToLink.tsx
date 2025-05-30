// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdArrowBack } from 'react-icons/md'
import {
  Link, Text
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface BackToLinkProps {
    url: string 
    text: string 
}

const BackToLink = ({ url, text }: BackToLinkProps) => {
  return (
    <Link 
      asChild 
      alignItems='center'
      display='flex'
      w='230px'
    >
      <RouterLink to={url}>
        <MdArrowBack 
          aria-describedby={`${text}`} 
          aria-hidden="true" 
          color='gray.700' 
          focusable="true"
          role="img"
        />

        <Text
          color='gray.700'
          fontFamily='Poppins'
          fontSize='sm'
          fontWeight='400'
          ml='10px'
        >{text}
        </Text>
      </RouterLink>
    </Link>
  )
}

export default BackToLink