import { Button, Flex } from "@chakra-ui/react"

interface APIClientsTabHeaderProps {
    onAddAPIClient: () => void
}

const APIClientsTabHeader = ({ onAddAPIClient }: APIClientsTabHeaderProps) => {
    return (
        <Flex justifyContent='flex-end' w='full'>
            <Flex alignItems='center' mt='5px'>
                <Button
                    variant='secondaryBlue600'
                    size='xs'
                    p='0 25px'
                    minW='5px'>
                        Refresh List
                </Button>
                <Button
                    onClick={onAddAPIClient}
                    variant='primaryBlue600'
                    size='xs'
                    p='0 25px'
                    minW='5px'
                    ml='8px'>
                        Add Subscription
                </Button>
            </Flex>
        </Flex>
    )
}

export default APIClientsTabHeader