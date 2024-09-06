import { WarningTwoIcon } from "@chakra-ui/icons"
import { Button, Flex, Text } from "@chakra-ui/react"

interface EdFiSettingsConnectSectionProps {
    onConnect: () => void
}

const EdFiSettingsConnectSection = ({ onConnect }: EdFiSettingsConnectSectionProps) => {
    return (
        <Flex 
            alignItems='center' 
            justifyContent='center' 
            flexDir='column' w='full'
            bg='gray.100'
            borderTop='2px'
            borderTopColor='gray.300'
            p="32px">
                <WarningTwoIcon fontSize='24px' />
                <Text
                    fontFamily='Open sans'
                    fontSize='14px'
                    fontWeight='700'
                    mt='6px'>No Connection Made</Text>
                <Text
                    color='gray.800'
                    fontFamily='Open sans'
                    fontWeight='400'
                    mt='6px'>
                        Applications within the Exchange will not function properly until a connection has been made.
                </Text>
                <Button
                    onClick={() => onConnect()}
                    variant='primaryBlue600'
                    mt='12px'
                    size='xs'>
                        Connect to Ed-Fi
                </Button>
        </Flex>
    )
}

export default EdFiSettingsConnectSection