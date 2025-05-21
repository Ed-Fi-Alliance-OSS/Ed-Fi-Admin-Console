// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex,
  Link,
  RadioGroup,
  Spinner,
  Table
} from '@chakra-ui/react'
import {
  CustomRadio, Tenant
} from '@edfi/admin-console-shared-sdk'
import { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTenantContext } from '../../../context/tenantContext'
import { ODSInstance } from '../../../core/ODSInstance.types'
import useOdsInstanceLink from '../../../hooks/odsInstances/useOdsInstanceLink'
import { UpdatingIsDefaultStatus } from '../../../hooks/odsInstances/useOdsInstanceTable.types'
import ManageInstanceBtn from './ManageInstanceBtn'
import ODSInstanceEdFiVersion from './ODSInstaceEdFiVersion'
import ODSInstanceEdFiStatus from './ODSInstanceEdFiStatus'
import ODSInstanceWorkerStatus from './ODSInstanceWorkerStatus'
import { ODSInstanceTableMode } from './ODSInstanceTable.types'
import ODSInstanceDataModelsLabel from './ODSInstanceTSDSVersion'
import SetUpInstanceBtn from './SetUpInstanceBtn'

interface ODSInstanceManagementTableRowItemProps {
  tableMode: ODSInstanceTableMode
  tenants: Tenant[]
  instance: ODSInstance
  // metadata: EdFiMetadata | undefined
  updatingIsDefault: UpdatingIsDefaultStatus
  canSetAsDefault: boolean
  selectedInstance: ODSInstance | null
  onSelectInstance: (instance: ODSInstance) => void
  onOpenSetDefaultModal: (instanceId: string) => void
  onOpenSetUpModal: (instanceId: string) => void
}

const ODSInstanceManagementTableRowItem = ({ tableMode, selectedInstance, instance, canSetAsDefault, updatingIsDefault, onSelectInstance, onOpenSetDefaultModal, onOpenSetUpModal }: ODSInstanceManagementTableRowItemProps) => {
  const showSetupBtn = () => {
    return false
  }

  const { getOdsInstanceLink } = useOdsInstanceLink()
  const { metaDataLoading, edFiStatus, edfiMetadata } = useTenantContext()

  useEffect(() => {
    // if (instance.isDefault) {
    //   onSelectInstance(instance)
    // }

    console.log('instance', instance)
  }, [])

  return (
    <>
      {tableMode != 'Display' && <Table.Cell w='80px'>
        <RadioGroup
          value={selectedInstance?.id ?? ''}
          onChange={() => onSelectInstance(instance)}
        >
          <CustomRadio
            isChecked={selectedInstance?.id == instance.id}
            text=""
            value={instance.id}
          />
        </RadioGroup>
      </Table.Cell>}

      <Table.Cell maxW="250px" overflow="hidden" px={4} py={2}>
        <Flex direction="column" overflow="hidden" w="100%">
          <Link
            as={RouterLink}
            color="blue.600"
            display="block"
            fontFamily="Poppins"
            fontSize="md"
            fontWeight="700"
            lineHeight="22px"
            overflow="hidden"
            state={{ instanceId: instance.id }}
            textOverflow="ellipsis"
            title={instance.name}
            to={getOdsInstanceLink(instance)}
            whiteSpace="nowrap"
          >
            {instance.name}
          </Link>
        </Flex>
      </Table.Cell>

      <Table.Cell>
        {metaDataLoading ? <Spinner /> : <ODSInstanceEdFiVersion version={edfiMetadata?.version} />}
      </Table.Cell>

      <Table.Cell>
        {metaDataLoading ? <Spinner /> : <ODSInstanceDataModelsLabel dataModels={edfiMetadata?.dataModels} />}
      </Table.Cell>

      <Table.Cell>
        {metaDataLoading ? <Spinner /> : <ODSInstanceEdFiStatus status={edFiStatus ?? ''} />}

      </Table.Cell>

      <Table.Cell>
        {metaDataLoading ? <Spinner /> : <ODSInstanceWorkerStatus status={instance.status ?? 'Error'} />}

      </Table.Cell>

      {tableMode == 'Display' && <>
        <Table.Cell>
          {showSetupBtn() ?
            <SetUpInstanceBtn
              instance={instance}
              updatingIsDefault={updatingIsDefault}
              onOpenSetUpModal={onOpenSetUpModal}
            /> :
            <ManageInstanceBtn instance={instance} />}
        </Table.Cell>
      </>}
    </>
  )
}

export default ODSInstanceManagementTableRowItem