import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue, Text } from '@chakra-ui/react'

interface InformationModalProps {
    type: 'alert' | 'confirmation' | 'information'
    content: JSX.Element | string
    header: JSX.Element | string
    footer: JSX.Element
    isOpen: boolean
    onClose: () => void
}

const EDXCustomModal = ({ type, header, content, footer, isOpen, onClose }: InformationModalProps) => {
    const bgColor = useColorModeValue("white", "blue.700")

    const selectModalTopColor = () => {
        if (type === 'alert') 
            return "red.600"
        if (type === 'confirmation')
            return useColorModeValue("blue.600", "blue.500")

        return "blue.100"
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent 
                bg={bgColor}
                borderRadius="4px"
                border='10px solid' 
                borderColor={selectModalTopColor()}
                borderBottom='0px'
                borderRight='0px'
                borderLeft='0px'
                minW='517px'
                my='auto'
                h='auto'
                w='auto'>
                    <ModalHeader 
                        fontSize='24px'
                        paddingBottom='0px'>
                        { header }
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody 
                        marginBottom='10px' 
                        paddingTop='0px' 
                        w=''>
                            { typeof(content) === 'string'? 
                                <Text 
                                    fontFamily='Open sans'>{ content }</Text> : content } 
                    </ModalBody>
                    <ModalFooter paddingBottom='35px'>
                        { footer }
                    </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
  
export default EDXCustomModal