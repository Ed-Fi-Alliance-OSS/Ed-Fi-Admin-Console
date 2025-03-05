// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Button, Flex, Text 
} from '@chakra-ui/react'

interface DataManagementTrainingBannerProps {
    text: string 
    onSkipTraining: () => void
    onLearnMode: () => void
}

const DataManagementTrainingBanner = ({ text, onSkipTraining, onLearnMode }: DataManagementTrainingBannerProps) => {
  return (
    <Flex
      bg='blue.500'
      borderRadius='4px'
      h='136px'
      padding='49px 36px'
      w='full'
    >
      <Text
        color='white'
        fontFamily='Poppins'
        fontSize='24px'
        fontWeight='700'
      >
        {text}
      </Text>

      <Flex ml='auto'>
        <Button
          border='1px'
          borderColor='white'
          borderRadius='4px'
          color='white'
          size='md'
          w='186px'
          onClick={onSkipTraining}
        >
          Skip Training
        </Button>

        <Button
          _hover={{
            color: 'white',
            bg: 'transparent' 
          }}
          bg='white'
          border='1px'
          borderColor='white'
          color='blue.900'
          ml='10px'
          size='md'
          variant='secondaryWhite'
          w='170px'
          onClick={onLearnMode}
        >
          Learn More
        </Button>
      </Flex>
    </Flex>
  )
}

export default DataManagementTrainingBanner