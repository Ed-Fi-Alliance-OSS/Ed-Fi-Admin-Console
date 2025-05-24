// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdArrowForward } from 'react-icons/md'
import {
  Flex, Image, Link, Text 
} from '@chakra-ui/react'
import { useConfig } from '@edfi/admin-console-shared-sdk'
import { Link as RouterLink } from 'react-router-dom'
import { ActionNavigationItem } from '../../core/actionNavigation'
import routes from '../../core/routes'

interface ActionNavigationCardProps {
    data: ActionNavigationItem
    index: number 
}

const ActionNavigationCard = ({ data, index }: ActionNavigationCardProps) => {
  const { config } = useConfig()
  return (
    <Link 
      _hover={{ borderColor: 'blue.600' }}
      bg='white'
      border='1px'
      borderColor='gray.300'
      borderRadius='4px'
      display='flex'
      flexDir='column' 
      h='112px'
      justifyContent='flex-start'
      mr='16px'
      padding='15px 14px 0px 14px'
      style={{ textDecoration: 'none' }}
      w='20%'
      asChild
    >
      <RouterLink to={routes.console.url}>
      {typeof(data.icon) === 'string'? 
        <Image 
          alt={data.name}
          h='32px' 
          src={data.icon}
          w='32px'
        /> : 
        data.icon}

      <Flex
        color='blue.600'
        mt='5px'
      >
        <Text 
          color='blue.600'
          fontFamily='Poppins' 
          fontWeight='400'
          maxW='180px'
          textDecoration='none'
        >{data.name}
        </Text>

        <Flex
          alignItems='center'
          h='20px'
          ml='10px'
        >
          <MdArrowForward 
            aria-hidden="true"
            focusable="false"
          />
        </Flex>
      </Flex>
      </RouterLink>
    </Link>
  )
}

export default ActionNavigationCard