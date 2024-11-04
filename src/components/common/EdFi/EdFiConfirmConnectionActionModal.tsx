import { Button, Flex, Text } from '@chakra-ui/react'
import EDXCustomModal from '../EDXCustomModal'

interface EdFiConfirmConnectionActionModalProps {
    show: boolean 
    isSaving: boolean 
    onAction: () => void
    onClose: () => void
}

const EdFiConfirmConnectionActionModal = ({ show, isSaving, onClose, onAction }: EdFiConfirmConnectionActionModalProps) => {
  return (
    <EDXCustomModal  
      type="alert"
      isOpen={show}
      header="Cancel?"
      content={<Flex flexDir='column' mt='12px'>
        <Text w='400px'>
                    There are unsaved issues in this form. Are you sure you want to close it?
        </Text>
      </Flex>}
      footer={<Flex alignItems='flex-start' w='full'>
        <Button
          onClick={onClose}
          isDisabled={isSaving}
          color='red.600'
          border='1px'
          borderColor='gray.400'
          padding='10px'
          size='sm'>
                        No, Go Back
        </Button>
        <Button
          onClick={onAction}
          isLoading={isSaving}
          border='1px'
          color='white'
          bg='#dd3827'
          borderColor='gray.400'
          padding='10px'
          ml='10px'
          size='sm'>
                        Yes, Cancel
        </Button>
      </Flex>}
      onClose={onClose} />
  )
}

export default EdFiConfirmConnectionActionModal