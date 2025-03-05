// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Skeleton 
} from '@chakra-ui/react'

interface AccordionItemSkeletonProps {
    itemsCount: number 
}

const AccordionItemSkeleton = ({ itemsCount }: AccordionItemSkeletonProps) => {
  return (
    <>
      { itemsCount === 0 && <Flex
        padding='16px'
        w='full'
      >
        <Skeleton
          h='40px'
          w='full'
        />
      </Flex>} 
    </>
  )
}

export default AccordionItemSkeleton