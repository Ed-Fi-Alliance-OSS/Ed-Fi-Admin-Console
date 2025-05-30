// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'

interface ModalFormProps {
    header: JSX.Element
    content: JSX.Element
    height: string 
    width: string 
    maxHeight?: string
}

const ModalForm = ({ header, content, height, width, maxHeight }: ModalFormProps) => {
  return (
    <form style={{
      display: 'flex',
      height,
      width,
      maxHeight: maxHeight || 'none',
      overflow: maxHeight ? 'auto' : 'visible'
    }}
    >
      <Flex 
        bg='white'
        display="flex"
        flexDir='column'
        h='full'
        overflow="hidden"
        padding='32px 34px'
        w='full'
      >
        <Flex w='full'>
          {header}
        </Flex>

        <Flex
          flexGrow={1}
          mt='32px'
          overflowY={maxHeight ? 'auto' : 'visible'}
          w='full'
        >
          {content}
        </Flex>
      </Flex>
    </form>
  )
}

export default ModalForm