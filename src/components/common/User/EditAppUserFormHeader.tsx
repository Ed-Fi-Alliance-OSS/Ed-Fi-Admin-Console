import { Button, Flex, Heading } from "@chakra-ui/react"

interface EditAppUserFormHeaderProps {
    isSaving: boolean 
    isActionDisabled: boolean 
    onSave: () => void
    onClose: () => void
}

const EditAppUserFormHeader = ({ isSaving, isActionDisabled, onSave, onClose }: EditAppUserFormHeaderProps) => {
    return (
        <Flex justifyContent='space-between' w='full'>
            <Heading
                fontFamily='Poppins'
                fontWeight='700'
                fontSize='32px'>Edit User</Heading>
            <Flex alignItems='flex-end'>
                <Button
                    onClick={onClose}
                    variant='secondaryBlue600'
                    size='xs'
                    padding='0 25px'>Cancel</Button>
                <Button
                    onClick={onSave}
                    isLoading={isSaving}
                    isDisabled={isActionDisabled}
                    variant='primaryBlue600'
                    size='xs'
                    padding='0 25px'
                    ml='10px'>Update User</Button>
            </Flex>
        </Flex>
    )
}

export default EditAppUserFormHeader