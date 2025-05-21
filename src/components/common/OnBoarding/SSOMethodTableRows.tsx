// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Table, Text
} from '@chakra-ui/react'
import { CustomSwitch } from '@edfi/admin-console-shared-sdk'
import { SSOMethod } from '../../../core/ssoMethods/SSOMethods.types'
import ControlTableRow from '../ControlTableRow'
import SSOConsentStatus from './SSOConsentStatus'

interface SSOMethodTableRowsProps {
    showOnlySelected: boolean
    ssoMethodsList: SSOMethod[]
    onToggleSSOMethod: (value: string) => void
}

const SSOMethodTableRows = ({ ssoMethodsList, showOnlySelected, onToggleSSOMethod }: SSOMethodTableRowsProps) => {
  return (
    <>
      {ssoMethodsList.filter(item => showOnlySelected? item.selected : true).map((ssoMethod, index) => 
        <ControlTableRow key={index}>
          <Table.Cell w={showOnlySelected? 'full' : 'auto'}>
            <Text
              color='blue.600'
              fontFamily='Poppins'
              fontWeight='700'
              fontSize='md'
            >
              {ssoMethod.name}
            </Text>
          </Table.Cell>

          <Table.Cell w='50%'>
            <SSOConsentStatus status={ssoMethod.consentStatus} />
          </Table.Cell>

          {!showOnlySelected? <Table.Cell>
            <CustomSwitch
              id={ssoMethod.name}
              isChecked={ssoMethod.selected}  
              isDisabled={ssoMethod.name === 'Acme Service Center'}
              onCheck={() => onToggleSSOMethod(ssoMethod.name)}
            />
          </Table.Cell> : <Table.Cell
            padding='0'
            w='0px'
          >
          </Table.Cell>}
        </ControlTableRow>)}
    </>
  )
}

export default SSOMethodTableRows