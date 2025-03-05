// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Td, Text
} from '@chakra-ui/react'
import { SISProviderInfo } from '../../../core/sisProviders/SISProviders.types'
import ControlTableRow from '../ControlTableRow'
import SISProviderConnectionTag from './SISProviderConnectionTag'

interface ConnectedSISProviderTableRowsProps {
    connectedSISProvidersList: SISProviderInfo[]
}

const ConnectedSISProvidersTableRows = ({ connectedSISProvidersList }: ConnectedSISProviderTableRowsProps) => {
  return (
    <>
      {connectedSISProvidersList.map((provider, index) => 
        <ControlTableRow key={index}>
          <Td w='15%'>
            <Text
              color='blue.600'
              fontFamily='Poppins'
              fontWeight='700'
              size='md'
            >
              {provider.name}
            </Text>
          </Td>

          <Td
            alignItems='flex-end'
            w='15%'
          >
            <Text>{provider.source}</Text>
          </Td>

          <Td w='5%'> 
            <SISProviderConnectionTag status={provider.status} />
          </Td>
        </ControlTableRow>)}
    </>
  )
}

export default ConnectedSISProvidersTableRows