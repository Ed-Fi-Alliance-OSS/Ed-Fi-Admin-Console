// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex 
} from '@chakra-ui/react'

interface APIClientsTabHeaderProps {
    onAddAPIClient: () => void
}

const APIClientsTabHeader = ({ onAddAPIClient }: APIClientsTabHeaderProps) => {
  return (
    <Flex
      justifyContent='flex-end'
      w='full'
    >
      <Flex
        alignItems='center'
        mt='5px'
      >
        <Button
          color='secondaryBlue600'
          fontSize='xs'
          minW='5px'
          p='0 25px'
          variant="solid"
        >
          Refresh List
        </Button>

        <Button
          color='primaryBlue600'
          fontSize='xs'
          minW='5px'
          ml='8px'
          p='0 25px'
          variant="solid"
          onClick={onAddAPIClient}
        >
          Add Subscription
        </Button>
      </Flex>
    </Flex>
  )
}

export default APIClientsTabHeader