import { Button, Flex, Heading } from "@chakra-ui/react"
import { Mode } from "../../../hooks/adminActions/subscriptions/useSubscriptionsForm.types"

interface SubscriptionFormHeaderProps {
    mode: Mode
    isSavingChanges: boolean 
    onSave: () => void
    onClose: () => void
}

const SubscriptionFormHeader = ({ mode, isSavingChanges, onSave, onClose }: SubscriptionFormHeaderProps) => {
    return (
        <Flex justifyContent='space-between' w='full'>
            <Heading
                fontFamily='Poppins'
                fontWeight='700'
                fontSize='32px'>{mode === 'Add'? 'Add' : 'Edit'} License</Heading>
            <Flex alignItems='flex-start'>
                <Button
                    onClick={onClose}
                    variant='secondaryBlue600'
                    size='xs'
                    padding='0 25px'>Cancel</Button>
                <Button
                    onClick={onSave}
                    isLoading={isSavingChanges}
                    variant='primaryBlue600'
                    size='xs'
                    padding='0 25px'
                    ml='10px'>{mode === 'Add'? 'Add' : 'Update'}</Button>
            </Flex>
        </Flex>
    )
}

export default SubscriptionFormHeader