// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex,
  GridItem,
  Text
} from '@chakra-ui/react'

interface DataHealthDetailsItemProps {
    text: string 
    value?: number | null
}

const DataHealthDetailsItem = ({ text, value }: DataHealthDetailsItemProps) => {
  const selectColor = () => value? 'green.400' : 'gray.300'
  const selectValueColor = () => value? '#3D8452' : 'gray.500'
  const selectTextColor = () => value? '#145025' : 'gray.500'

  return (
    <GridItem 
      border='1px'
      borderColor={selectColor()}
      borderRadius='4px'
      h='115px'
      padding='10px 10px'
      w='full'
    >
      <Flex
        flexDir='column'
        h='full'
        w='full'
      >
        <Text 
          color={selectTextColor()}
          fontFamily='Poppins'
          fontSize='14px'
          fontWeight='700'
        >{text}
        </Text>

        <Text
          color={selectValueColor()}
          fontSize='28px'
          fontWeight='700'
          h='30px'
          mt='auto'
        >{value? value : '--'}
        </Text>
      </Flex>
    </GridItem>
  )
}

export default DataHealthDetailsItem