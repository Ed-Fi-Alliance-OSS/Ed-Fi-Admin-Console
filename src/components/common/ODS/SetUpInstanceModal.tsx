import { Button, Flex, Text } from "@chakra-ui/react"
import { ODSInstance } from "../../../core/ODSInstance.types"
import useOdsInstanceDisplayYear from "../../../hooks/odsInstances/useOdsInstanceYearName"
import useRedirectToSetUpWizard from "../../../hooks/odsInstances/useRedirectToSetUpPage"
import EDXCustomModal from "../EDXCustomModal"

interface SetUpInstanceModalProps {
    instance: ODSInstance
    show: boolean 
    onClose: () => void
}

const SetUpInstanceModal = ({ instance, show, onClose }: SetUpInstanceModalProps) => {
    const { getDisplayYear } = useOdsInstanceDisplayYear()
    const { onRedirectToSetupWizard } = useRedirectToSetUpWizard()

    return (
        <EDXCustomModal  
            type="alert"
            isOpen={show}
            header="You must set up this school year in order to set it as the default."
            content={<Flex flexDir='column' mt='12px'>
                    <Text w='400px'>
                        Before this school year can be marked as the default for your District/Charter School, it must be configured.
                    </Text>
                </Flex>}
            footer={<Flex alignItems='flex-start' w='full'>
                <Button
                    onClick={onClose}
                    color='red.600'
                    border='1px'
                    borderColor='gray.400'
                    padding='10px'
                    size='sm'>
                        Nevermind
                </Button>
                <Button
                    onClick={() => onRedirectToSetupWizard(instance)}
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
                       Set Up { getDisplayYear(instance) }
                </Button>
            </Flex>}
            onClose={onClose} />
    )
}

export default SetUpInstanceModal