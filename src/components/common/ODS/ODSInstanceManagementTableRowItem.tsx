import { RadioGroup, Td } from '@chakra-ui/react'
import ManageInstanceBtn from './ManageInstanceBtn'
import ODSInstanceEdFiVersion from './ODSInstaceEdFiVersion'
import ODSInstanceEdFiStatus from './ODSInstanceEdFiStatus'
import ODSInstanceHostingType from './ODSInstanceHostingType'
import ODSInstanceIsDefaultMark from './ODSInstanceIsDefaultMark'
import ODSInstanceTSDSVersion from './ODSInstanceTSDSVersion'
import ODSInstanceYear from './ODSInstanceYear'
import SetUpInstanceBtn from './SetUpInstanceBtn'
import { ExtendedODSInstance } from '../../../core/ODSInstance.types'
import { UpdatingIsDefaultStatus } from '../../../hooks/odsInstances/useOdsInstanceTable.types'
import { ODSInstanceTableMode } from './ODSInstanceTable.types'
import { CustomRadio } from '@edfi/admin-console-shared-sdk'
import { useEffect } from 'react'

interface ODSInstanceManagementTableRowItemProps {
    tableMode: ODSInstanceTableMode
    instance: ExtendedODSInstance
    updatingIsDefault: UpdatingIsDefaultStatus
    canSetAsDefault: boolean 
    selectedInstance: ExtendedODSInstance | null
    onSelectInstance: (instance: ExtendedODSInstance) => void
    onOpenSetDefaultModal: (instanceId: string) => void
    onOpenSetUpModal: (instanceId: string) => void
}

const ODSInstanceManagementTableRowItem = ({ tableMode, selectedInstance, instance, canSetAsDefault, updatingIsDefault, onSelectInstance, onOpenSetDefaultModal, onOpenSetUpModal }: ODSInstanceManagementTableRowItemProps) => {
  const showSetupBtn = () => {
    const edFiStatus = instance.edFiStatus

    if (edFiStatus.operationStatus == 'Offline')  
      return false
            
    return true
  }

  useEffect(() => {
    if (instance.isDefault) {
      onSelectInstance(instance)
    }
    console.log('instance', instance)
  }, [])

  return (
    <>
      { tableMode != 'Display' && <Td w='80px'>
        <RadioGroup 
          onChange={() => onSelectInstance(instance)} 
          value={selectedInstance?.instanceId ?? ''}>
          <CustomRadio 
            isChecked={selectedInstance?.instanceId == instance.instanceId}
            text=""
            value={instance.instanceId} />
        </RadioGroup>
      </Td> }
      <Td w='200px'>
        <ODSInstanceYear 
          instance={instance} />
      </Td>
      <Td>
        <ODSInstanceEdFiVersion 
          version={instance.edFiVersion} /> 
      </Td>
      <Td>
        <ODSInstanceTSDSVersion 
          version={instance.tsdsVersion} /> 
      </Td>
      <Td>
        <ODSInstanceEdFiStatus 
          status={instance.edFiStatus} />
      </Td>
      { tableMode == 'Display' && <>
        <Td>
          {showSetupBtn()?  
            <SetUpInstanceBtn
              instance={instance}
              updatingIsDefault={updatingIsDefault}
              onOpenSetUpModal={onOpenSetUpModal} />
            : <ManageInstanceBtn 
              instance={instance}
              canSetAsDefault={canSetAsDefault}
              updatingIsDefault={updatingIsDefault}
              onOpenSetDefaultModal={onOpenSetDefaultModal} /> }
        </Td> 
      </>}
    </>
  )
}

export default ODSInstanceManagementTableRowItem