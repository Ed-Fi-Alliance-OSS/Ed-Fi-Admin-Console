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
          bg='white'
          border='1px'
          borderColor='secondaryBlue600'
          boxShadow='0 0 0 2px rgba(59, 130, 246, 0.3)'
          color='secondaryBlue600'
          minW='5px'
          p='0 25px'
          size='sm'
          fontFamily='Poppins'
          fontSize='14px'
          fontWeight='600'
          lineHeight='1.2'
          variant="outline"
          _hover={{ bg: 'blue.50', borderColor: 'blue.600', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' }}
          onClick={onRefresh}
        >
          Refresh List
        </Button>

        <Button
          bg='blue.600'
          border='1px'
          borderColor='blue.600'
          boxShadow='0 0 0 1px rgba(59, 130, 246, 0.3)'
          color='white'
          ml='16px'
          padding='10px'
          size='sm'
          type="button"
          fontFamily='Poppins'
          fontSize='14px'
          fontWeight='600'
          lineHeight='1.2'

          _hover={{ bg: 'blue.700', borderColor: 'blue.700', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' }}
          onClick={onAddPartner}
        >
          Add Vendor
        </Button>
      </Flex>
    </Flex>
  )
}

export default PartnersAndApplicationControls