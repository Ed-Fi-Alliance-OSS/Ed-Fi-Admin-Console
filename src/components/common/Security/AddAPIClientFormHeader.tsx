// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Heading 
} from '@chakra-ui/react'

interface AddAPIClientFormHeaderProps {
    onClose: () => void
}

const AddAPIClientFormHeader = ({ onClose }: AddAPIClientFormHeaderProps) => {
  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <Heading
        fontFamily='Poppins'
        fontSize='32px'
        fontWeight='700'
        lineHeight='40px'
        w='50%'
      >Add API Client
      </Heading>

      <Flex alignItems='flex-start'>
        <Button
          color='secondaryBlue600'
          padding='0 25px'
          size='xs'
          variant="solid"
          onClick={onClose}
        >Cancel
        </Button>

        <Button
          color='primaryBlue600'
          ml='10px'
          padding='0 25px'
          size='xs'
          variant='solid'
        >Add
        </Button>
      </Flex>
    </Flex>
  )
}

export default AddAPIClientFormHeader