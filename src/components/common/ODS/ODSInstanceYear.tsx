// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Link
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useOdsInstanceLink from '../../../hooks/odsInstances/useOdsInstanceLink'
import useOdsInstanceDisplayYear from '../../../hooks/odsInstances/useOdsInstanceYearName'

interface ODSInstanceYearProps {
    instance: ODSInstance
}

const ODSInstanceYear = ({ instance }: ODSInstanceYearProps) => {
  const { getOdsInstanceLink } = useOdsInstanceLink()
  const { getDisplayYear } = useOdsInstanceDisplayYear()

  return (
    <Flex
      flexDir='column'
      flexWrap='wrap'
      h='auto'
      w='250px'
    >
      <Link 
        as={RouterLink} 
        color='blue.600'
        fontFamily='Poppins'
        fontWeight='700'
        lineHeight='22px'
        size='md'
        state={{ instanceId: instance.instanceId }}
        to={getOdsInstanceLink(instance)}
        w="100px"
      >
        { getDisplayYear(instance) }
      </Link>
    </Flex>
  )
}

export default ODSInstanceYear