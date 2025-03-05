// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import InstanceDescription from './InstanceDescription'

interface SummaryContentProps {
    instance: ODSInstance 
}

const SummaryContent = ({ instance }: SummaryContentProps) => {
  return (
    <>
      <Flex>
        <InstanceDescription instance={instance} />
      </Flex>
    </>
  )
}

export default SummaryContent