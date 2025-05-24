// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Link, Text
} from '@chakra-ui/react'
import { MdHelpOutline } from 'react-icons/md'

interface NeedHelpsLinksProps {
    knowledgeBaseUrl: string 
    supportUrl: string
}

const NeedHelpLinks = ({ knowledgeBaseUrl, supportUrl }: NeedHelpsLinksProps) => {
  return (
    <Flex 
      color='gray.800'
      fontFamily='Poppins'
      fontWeight='400'
    >
      <MdHelpOutline 
        aria-hidden="true"
        color="#1E2D36"
        focusable='false'
        fontSize='25px'
        height='15px'
        width='15px'
      />

      <Text
        color='gray.800'
        ml='5px'
      >
        Need help? Visit our 
        <Link 
          color='blue.500'
          fontWeight='700'
          ml='2px' 
          mr='2px' 
          referrerPolicy="no-referrer" 
          target='_blank'
          as Child
        >
          <RouterLink to={knowledgeBaseUrl}>
          Knowledge Base 
          </RouterLink>
        </Link>
        or 

        <Link 
          color='blue.500'
          fontWeight='700'
          href={}
          ml='2px' 
          referrerPolicy="no-referrer" 
          target='_blank'
          asChild
        >
          <RouterLink to={supportUrl}>
          submit a support ticket.
          </RouterLink>
        </Link>
      </Text>
    </Flex>
  )
}

export default NeedHelpLinks