// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import InstanceDescription from './InstanceDescription'
import DataHealthDataGrid from '../OnBoarding/DataHealthDataGrid'
import InstanceDataPreview from './InstanceDataPreview'

interface SummaryContentProps {
  instance: ODSInstance
}

const SummaryContent = ({ instance }: SummaryContentProps) => {

  return (
    <Flex
      direction={{
        base: 'column',
        md: 'row' 
      }}
      w="100%"
      wrap="wrap"
    >
      <Flex
        mb={{
          base: 4,
          md: 0 
        }}
        pr={{
          base: 0,
          md: 6 
        }}
        w={{
          base: '100%',
          md: '60%' 
        }}
      >
        <InstanceDescription instance={instance} />
      </Flex>

      <Flex
        alignItems={{
          base: 'flex-start',
          md: 'flex-end' 
        }}
        justifyContent={{
          base: 'flex-start',
          md: 'flex-end' 
        }}
        w={{
          base: '100%',
          md: '40%' 
        }}
      >
        <InstanceDataPreview instance={instance} />
      </Flex>
    </Flex>

  )
}

export default SummaryContent