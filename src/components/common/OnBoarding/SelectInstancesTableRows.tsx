import {
  Flex, Td, Text 
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { AvailableInstance } from '../../../core/ODSInstance.types'
import ControlTableRow from '../ControlTableRow'
import { CustomCheckbox } from '@edfi/admin-console-shared-sdk'
import ODSInstanceEdFiStatus from '../ODS/ODSInstanceEdFiStatus'

interface SelectInstancesTableRowsProps {
    instancesList: AvailableInstance[]
    showChecked: boolean
    onSelectInstance: (e: ChangeEvent<HTMLInputElement>) => void
}

const SelectInstancesTableRows = ({ instancesList, showChecked, onSelectInstance }: SelectInstancesTableRowsProps) => {
  return (
    <>
      {instancesList.map((instance, index) => 
        <ControlTableRow key={index}>
          <Td w={showChecked? 'auto' : '30%'}>
            <Flex>
              {showChecked && <CustomCheckbox
                id={instance.district}
                isChecked={instance.isSelected}
                value={instance.district}
                onCheck={onSelectInstance}
              />}

              <Text
                color='gray.700'
                fontFamily='Open sans'
                fontWeight='400'
                ml={showChecked? '10px' : '0px'}
                size='md'
              >
                {instance.district}
              </Text>
            </Flex>
          </Td>

          <Td w={showChecked? 'auto' : '30%'}>
            <Text
              color='blue.600'
              fontFamily='Open sans'
              fontWeight='700'
              size='md'
            >
              {instance.instanceYear}
            </Text>
          </Td>

          <Td w={showChecked? 'auto' : '30%'}>
            <Text
              color='gray.700'
              fontFamily='Open sans'
              fontWeight='400'
              size='md'
            >
              {instance.edfiVersion}
            </Text>
          </Td>

          <Td>
            <ODSInstanceEdFiStatus status={instance.edfiStatus} />
          </Td>
        </ControlTableRow>)}
    </>
  )
}

export default SelectInstancesTableRows