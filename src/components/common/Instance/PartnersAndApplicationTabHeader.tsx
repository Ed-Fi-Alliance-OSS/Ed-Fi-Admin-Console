// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import TabHeading from '../TabHeading'
import PartnersAndApplicationControls from './PartnersAndApplicationControls'

interface PartnersAndApplicationTabHeaderProps {
   onAddVendor: () => void
   onRefresh: () => void
}

const PartnersAndApplicationTabHeader = ({ onAddVendor, onRefresh }: PartnersAndApplicationTabHeaderProps) => {
  return (
    <Flex
      justifyContent='space-between'
      w='full'
    >
      <TabHeading text='Vendors & Applications' />

      <PartnersAndApplicationControls
        onAddPartner={onAddVendor}
        onRefresh={onRefresh}
      />
    </Flex>
  )
}

export default PartnersAndApplicationTabHeader