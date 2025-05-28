// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useOdsInstanceLink from '../../../hooks/odsInstances/useOdsInstanceLink'

interface ManageInstanceBtnProps {
    instance: ODSInstance
}

const ManageInstanceBtn = ({ instance }: ManageInstanceBtnProps) => {
  const { getOdsInstanceLink } = useOdsInstanceLink()
  const navigate = useNavigate()

  return (
    <Flex w='80px'>
      <Button 
        bg='blue.600'
        border='1px'
        borderColor='blue.600'
        boxShadow='0 0 0 1px rgba(59, 130, 246, 0.3)'
        color='white'
        ml='16px'
        padding='10px'
        size='xs'
        type="button"
        fontFamily='Poppins'
        fontSize='11px'
        fontWeight='600'
        lineHeight='1.2'
        _hover={{ bg: 'blue.700', borderColor: 'blue.700', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' }}
        onClick={() => navigate(getOdsInstanceLink(instance))}
      >
        Manage
      </Button>
    </Flex>
  )
}

export default ManageInstanceBtn