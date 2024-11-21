import {
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay 
} from '@chakra-ui/react'

interface AddAppUserModalProps {
    content: JSX.Element
    show: boolean 
    onClose: () => void
}

const ConsoleModal = ({ content, show, onClose }: AddAppUserModalProps) => {
  return (
    <Modal 
      isOpen={show} 
      motionPreset='slideInRight'
      onClose={onClose}
    >
      <ModalOverlay />

      <ModalContent 
        aria-label="Form Modal"
        borderRadius='0'
        h='100vh' 
        marginLeft='auto'
        maxW='629px'
        mt='0'
        top='0rem' 
        w='629px'
      >
        <ModalCloseButton />

        <ModalBody 
          bg='#eff4f6'
          left='0'
          maxW='629px'
          padding='111px 67px 463px 42px' 
          w='629px'
        >
          {content}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConsoleModal