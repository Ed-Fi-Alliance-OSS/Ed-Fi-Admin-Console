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
}

const ModalForm = ({ header, content, height, width }: ModalFormProps) => {
  return (
    <form style={{
      display: 'flex',
      height,
      width 
    }}
    >
      <Flex 
        bg='white'
        flexDir='column'
        h='full'
        padding='32px 34px'
        w='full'
      >
        <Flex w='full'>
          {header}
        </Flex>

        <Flex
          mt='32px'
          w='full'
        >
          {content}
        </Flex>
      </Flex>
    </form>
  )
}

export default ModalForm