import {
  Flex,
  Link,
  RadioGroup,
  Spinner,
  Td
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

const ODSInstanceManagementTableRowItem = ({  tableMode, selectedInstance, instance, canSetAsDefault, updatingIsDefault, onSelectInstance, onOpenSetDefaultModal, onOpenSetUpModal }: ODSInstanceManagementTableRowItemProps) => {
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
      {tableMode != 'Display' && <Td w='80px'>
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
      </Td>}

      <Td width={400}>
        <Flex
          flexDir='column'
          flexWrap='wrap'
          h='auto'
          w='250px'
        >
          <Link
            as={RouterLink} 
            color='blue.600'
            fontFamily='Poppins'
            fontWeight='700'
            lineHeight='22px'
            size='md'
            state={{ instanceId: instance.id }}
            to={getOdsInstanceLink(instance)}
            w="100px"
          >
            {instance.name}
          </Link>
        </Flex>
      </Td>

      <Td>
        {metaDataLoading ? <Spinner /> : <ODSInstanceEdFiVersion version={edfiMetadata?.version} /> }
      </Td>

      <Td>
        {metaDataLoading ? <Spinner /> : <ODSInstanceDataModelsLabel dataModels={edfiMetadata?.dataModels} /> }
      </Td>

      <Td>
        {metaDataLoading ? <Spinner /> : <ODSInstanceEdFiStatus status={edFiStatus ?? ''} />}
      </Td>

      {tableMode == 'Display' && <>
        <Td>
          {showSetupBtn() ?
            <SetUpInstanceBtn
              instance={instance}
              updatingIsDefault={updatingIsDefault}
              onOpenSetUpModal={onOpenSetUpModal}
            /> : 
            <ManageInstanceBtn instance={instance} />}
        </Td>
      </>}
    </>
  )
}

export default ODSInstanceManagementTableRowItem