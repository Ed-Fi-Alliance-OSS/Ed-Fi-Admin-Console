// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { MdEdit } from 'react-icons/md'
import {
  Button, Text
} from '@chakra-ui/react'

interface EditInstanceBtnProps {
    onClick: () => void
}

const EditInstanceBtn = ({ onClick }: EditInstanceBtnProps) => {
  return (
    <Button 
      alignItems='center'
      color='blue.600'
      display='flex' 
      maxW='auto' 
      minW='auto' 
      padding='0'
      w='170px'
      onClick={onClick}
    >
      <MdEdit
        aria-hidden="true"
        color='blue.600'
        focusable="false"
        fontSize='15px'
      />

      <Text
        color='blue.600'
        fontFamily='Poppins'
        fontWeight='400'
        ml='5px'
        size='md'
      >Edit Instance Details
      </Text>
    </Button>
  )
}

export default EditInstanceBtn