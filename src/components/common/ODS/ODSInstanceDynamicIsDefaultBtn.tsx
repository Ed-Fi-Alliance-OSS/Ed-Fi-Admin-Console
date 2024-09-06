import { Button, Flex, Text } from "@chakra-ui/react"
import ODSInstanceIsDefaultMark from "./ODSInstanceIsDefaultMark"
import { ODSInstance } from "../../../core/ODSInstance.types"

interface ODSInstanceDynamicIsDefaultBtnProps {
    instance: ODSInstance
    canSetDefault: boolean
    onOpenIsDefaultModal: () => void
    onShowSetUpWizardModal: () => void
}

const ODSInstanceDynamicIsDefaultBtn = ({ instance, canSetDefault, onOpenIsDefaultModal, onShowSetUpWizardModal }: ODSInstanceDynamicIsDefaultBtnProps) => {
    const shouldShowSetupModal = () => {
        if (!instance.verificationStatus)
            return true 

        if (instance.verificationStatus.status !== 'Completed')
            return true

        return false
    }

    return (
        <>
            { instance.isDefault? 
                <Flex alignItems='center' ml='auto' w='225px'>
                    <Text
                        fontSize='16px'
                        fontWeight='700'
                        mr='auto'>
                            Default School Year
                    </Text>
                    <ODSInstanceIsDefaultMark
                        isDefault={instance.isDefault}
                        w='20px' />
                </Flex> 
                : 
                <Button
                    onClick={shouldShowSetupModal()? onShowSetUpWizardModal : onOpenIsDefaultModal}
                    isDisabled={!canSetDefault}
                    variant='primaryBlue600'
                    size='xs'
                    w='220px'>   
                        Set as Default School Year
                </Button>}
        </> 
    )
}

export default ODSInstanceDynamicIsDefaultBtn