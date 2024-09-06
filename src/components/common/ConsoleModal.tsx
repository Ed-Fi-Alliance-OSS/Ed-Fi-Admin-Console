import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react"

interface AddAppUserModalProps {
    content: JSX.Element
    show: boolean 
    onClose: () => void
}

const ConsoleModal = ({ content, show, onClose }: AddAppUserModalProps) => {
    return (
        <Modal 
            isOpen={show} 
            onClose={onClose}
            motionPreset='slideInRight'
            >
                <ModalOverlay />
                <ModalContent 
                    aria-label={`Form Modal`}
                    borderRadius='0'
                    top='0rem' 
                    mt='0'
                    h='100vh'
                    marginLeft='auto'
                    maxW='629px' 
                    w='629px' >
                        <ModalCloseButton />
                        <ModalBody 
                            bg='#eff4f6'
                            padding='111px 67px 463px 42px'
                            left='0'
                            w='629px' 
                            maxW='629px'>
                                {content}
                        </ModalBody>
                </ModalContent>
        </Modal>
    )
}

export default ConsoleModal