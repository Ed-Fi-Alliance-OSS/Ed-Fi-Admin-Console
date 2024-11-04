import { Button, Flex, Text } from '@chakra-ui/react'
import { ODSInstance } from '../../../core/ODSInstance.types'
import EDXCustomModal from '../EDXCustomModal'

interface ConfirmSetDefaultInstanceModalProps {
    instance: ODSInstance
    show: boolean 
    updatingInstance: boolean 
    onSetIsDefault: (instanceId: string, isDefault: boolean, validate: boolean) => void
    onClose: () => void
}

const ConfirmSetDefaultInstanceModal = ({ instance, show, updatingInstance, onSetIsDefault, onClose }: ConfirmSetDefaultInstanceModalProps) => {
  return (
    <EDXCustomModal  
      type="alert"
      isOpen={show}
      header="Set as Default School Year?"
      content={<Flex flexDir='column' mt='12px'>
        <Text w='400px'>
                        This will change the default school year for your entire District/Charter School. 
                        Only one school year can be the global default at a time, and you will be unable to revert this change.
        </Text>
      </Flex>}
      footer={<Flex alignItems='flex-start' w='full'>
        <Button
          onClick={onClose}
          isDisabled={updatingInstance}
          color='red.600'
          border='1px'
          borderColor='gray.400'
          padding='10px'
          size='sm'>
                        No, Cancel
        </Button>
        <Button
          onClick={() => onSetIsDefault(instance.instanceId, true, true)}
          isLoading={updatingInstance}
          border='1px'
          color='white'
          bg='#DC3625'
          borderColor='#DC3625'
          padding='10px'
          ml='10px'
          size='sm'
          _hover={{
            _disabled: {
              bg: '#DC3625'
            }
          }}>
                        Yes, Set as Default
        </Button>
      </Flex>}
      onClose={onClose} />
  )
}

export default ConfirmSetDefaultInstanceModal