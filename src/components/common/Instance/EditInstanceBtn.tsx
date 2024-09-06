import { EditIcon } from "@chakra-ui/icons"
import { Button, Text } from "@chakra-ui/react"

interface EditInstanceBtnProps {
    onClick: () => void
}

const EditInstanceBtn = ({ onClick }: EditInstanceBtnProps) => {
    return (
        <Button 
            display='flex'
            alignItems='center'
            color='blue.600' 
            onClick={onClick} 
            padding='0' 
            minW='auto'
            maxW='auto'
            w='170px'>
                <EditIcon color='blue.600' fontSize='15px' aria-hidden="true" focusable="false" />
                <Text
                    color='blue.600'
                    fontFamily='Open sans'
                    fontWeight='400'
                    size='md'
                    ml='5px'>Edit Instance Details</Text>
        </Button>
    )
}

export default EditInstanceBtn