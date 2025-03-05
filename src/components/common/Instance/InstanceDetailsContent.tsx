// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import TabHeading from '../TabHeading'
import InstanceDetailsForm from './InstanceDetailsForm'

interface InstanceDetailsContentProps {
    mode: 'add' | 'edit'
    instance?: ODSInstance
}

const InstanceDetailsContent = ({ mode, instance }: InstanceDetailsContentProps) => {
  return (
    <Flex w='full'>
      <TabHeading text={mode === 'add'? 'Create Instance' : 'Edit Instance Details'} />

      <Flex
        ml='45px'
        mt='15px'
        w='full'
      >
        <InstanceDetailsForm
          instance={instance}
          mode={mode}
        />
      </Flex>
    </Flex>
  )
}

export default InstanceDetailsContent