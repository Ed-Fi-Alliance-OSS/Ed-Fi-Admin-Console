import {
  RadioGroup, Td
} from '@chakra-ui/react'
import { CustomRadio } from '@edfi/admin-console-shared-sdk'
import { useEffect } from 'react'
import { ExtendedODSInstance } from '../../../core/ODSInstance.types'
import { UpdatingIsDefaultStatus } from '../../../hooks/odsInstances/useOdsInstanceTable.types'
import ManageInstanceBtn from './ManageInstanceBtn'
import ODSInstanceEdFiStatus from './ODSInstanceEdFiStatus'
import { ODSInstanceTableMode } from './ODSInstanceTable.types'
import ODSInstanceYear from './ODSInstanceYear'
import SetUpInstanceBtn from './SetUpInstanceBtn'

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

    if (edFiStatus.operationStatus == 'Offline') {
      return false
    }
            
    return true
  }

  useEffect(() => {
    // if (instance.isDefault) {
    //   onSelectInstance(instance)
    // }

    console.log('instance', instance)
  }, [])

  return (
    <>
      { tableMode != 'Display' && <Td w='80px'>
        <RadioGroup 
          value={selectedInstance?.odsInstanceId ?? ''} 
          onChange={() => onSelectInstance(instance)}
        >
          <CustomRadio 
            isChecked={selectedInstance?.odsInstanceId == instance.odsInstanceId}
            text=""
            value={instance.odsInstanceId}
          />
        </RadioGroup>
      </Td> }

      <Td w='200px'>
        <ODSInstanceYear instance={instance} />
      </Td>

      <Td>
        N/A
        {/* <ODSInstanceEdFiVersion version={instance.edFiVersion} />  */}
      </Td>

      <Td>
        N/A
        {/* <ODSInstanceDataModelsLabel dataModels={instance.edfiMetadata.dataModels} />  */}
      </Td>

      <Td>
        <ODSInstanceEdFiStatus status={instance.edFiStatus} />
      </Td>

      { tableMode == 'Display' && <>
        <Td>
          {showSetupBtn()?  
            <SetUpInstanceBtn
              instance={instance}
              updatingIsDefault={updatingIsDefault}
              onOpenSetUpModal={onOpenSetUpModal}
            />
            : <ManageInstanceBtn 
                canSetAsDefault={canSetAsDefault}
                instance={instance}
                updatingIsDefault={updatingIsDefault}
                onOpenSetDefaultModal={onOpenSetDefaultModal}
            /> }
        </Td> 
      </>}
    </>
  )
}

export default ODSInstanceManagementTableRowItem