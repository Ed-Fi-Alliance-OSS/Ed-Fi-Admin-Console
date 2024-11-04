import { Flex, Text, Button } from '@chakra-ui/react'
import EDXCustomModal from '../EDXCustomModal'
import useOdsInstanceDisplayYear from '../../../hooks/odsInstances/useOdsInstanceYearName'
import { ExtendedODSInstance } from '../../../core/ODSInstance.types'

interface SelectedInstancesTableModalProps {
    selectedInstance: ExtendedODSInstance | null
    showConfirmInstanceModal: boolean 
    settingAsDefault: boolean 
    onContinue: () => void
    onClose: () => void
}

const SelectedInstancesTableModal = ({ selectedInstance, settingAsDefault, showConfirmInstanceModal, onClose, onContinue }: SelectedInstancesTableModalProps) => {
  const { getDisplayYear } = useOdsInstanceDisplayYear()
    
  return (
    <EDXCustomModal
      type="information"
      header="Are you sure this is the school year you'd like to work with?"
      content={<Flex flexDir='column' mt='12px'>
        <Text>
                    By continuing you'll be allowing Acme Service Center to load data into the following school year
                    for the Data Warehouse, User Sync, and potential future apps:
        </Text>
        <Text color='blue.700' fontWeight='bold' mt='32px'>
          { selectedInstance? getDisplayYear(selectedInstance) : '0000' }
        </Text>
      </Flex>}
      footer={<Flex w='full'>
        <Button 
          onClick={onClose} 
          isDisabled={settingAsDefault}
          color='gray.800' 
          border='1px' 
          borderColor='gray.300'
          size='sm'>
                        No, Go Back
        </Button>
        <Button 
          onClick={onContinue} 
          isLoading={settingAsDefault}
          color='white' 
          bg='gray.800' 
          ml='10px'
          size='sm'
          _hover={{
            _loading: {
              bg: 'gray.800'
            }
          }}>
                        Yes, Continue
        </Button>
      </Flex>}
      isOpen={showConfirmInstanceModal}
      onClose={onClose} /> 
  )
}

export default SelectedInstancesTableModal