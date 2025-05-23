// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex 
} from '@chakra-ui/react'

interface PartnersAndApplicationControlsProps {
    onAddPartner: () => void
    onRefresh: () => void
}

const PartnersAndApplicationControls = ({ onAddPartner, onRefresh }: PartnersAndApplicationControlsProps) => {
  return (
    <Flex justifyContent='flex-end'>
      <Flex
        alignItems='center'
        mt='5px'
      >
        <Button
          color='secondaryBlue600'
          minW='5px'
          p='0 25px'
          size='xs'
          variant="solid"
          onClick={onRefresh}
        >
          Refresh List
        </Button>

        <Button
          color='primaryBlue600'
          minW='5px'
          ml='8px'
          p='0 25px'
          size='xs'
          variant='solid'
          onClick={onAddPartner}
        >
          Add Vendor
        </Button>
      </Flex>
    </Flex>
  )
}

export default PartnersAndApplicationControls