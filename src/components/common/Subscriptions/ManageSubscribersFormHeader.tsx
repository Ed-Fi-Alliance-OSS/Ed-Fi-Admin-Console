import { Button, Flex, Heading } from "@chakra-ui/react"

interface ManageSubscribersFormHeaderProps {
    isSavingChanges: boolean 
    onSave: () => void
    onClose: () => void
}

const ManageSubscribersFormHeader = ({ isSavingChanges, onSave, onClose }: ManageSubscribersFormHeaderProps) => {
    return (
        <Flex justifyContent='space-between' w='full'>
            <Heading
                fontFamily='Poppins'
                fontWeight='700'
                fontSize='32px'>Manage Licenses</Heading>
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
                    ml='10px'>Update</Button>
            </Flex>
        </Flex>
    )
}

export default ManageSubscribersFormHeader