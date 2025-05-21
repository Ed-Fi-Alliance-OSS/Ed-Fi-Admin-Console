// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  MdClose, MdInfo 
} from 'react-icons/md'
import {
  Button, Flex, Link, Text
} from '@chakra-ui/react'
import { useState } from 'react'
import useHelpLinks from '../../../hooks/useHelpLinks'

const EdFiSettingsWarningBanner = () => {
  const [ show, setShow ] = useState(true)
  const { getAdminActionHelpLinks } = useHelpLinks()

  return (
    <>
      { show && <Flex 
        alignItems='flex-start'
        bg='orange.100'
        flexDir='column'
        mt='16px'
        p='10px 12px'
        w='90%'
      >
        <Flex
          mt='3px'
          w='full'
        >
          <Flex alignItems='center'>
            <MdInfo color='orange.500' />

            <Text
              color='gray.800' 
              fontFamily='Poppins' 
              fontSize='16px'
              fontWeight='700'
              ml='16px'
            >
              LIMITED FUNCTIONALITY
            </Text>
          </Flex>

          <Flex ml='auto'>
            <Button minW='auto'>
              <MdClose 
                fontSize='12px'
                onClick={() => setShow(false)}
              />
            </Button>
          </Flex>
        </Flex>

        <Flex
          flexDir='column'
          ml='16px'
          mt='6px'
          w='80%'
        >
          <Text 
            color='gray.800' 
            fontFamily='Poppins' 
            fontSize='14px'
            ml='16px'
          >
            Note: The functionality below is limited due to the use of an externally-hosted ODS. 
            To enable functionality and/or learn more, 
            visit our 
            <Link 
              fontWeight='700'
              href={getAdminActionHelpLinks().knowledgeBaseUrl}
              ml='2px'
              mr='2px'  
              referrerPolicy="no-referrer" 
              target='_blank'
            >
              Knowledge Base 
            </Link>
            or 

            <Link 
              fontWeight='700'
              href={getAdminActionHelpLinks().supportTicketUrl}
              ml='2px'
              referrerPolicy="no-referrer" 
              target='_blank'
            >
              submit a support ticket
            </Link>.
          </Text>
        </Flex>
      </Flex> }
    </>
  )
}

export default EdFiSettingsWarningBanner