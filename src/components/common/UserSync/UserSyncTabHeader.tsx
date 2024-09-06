import { ArrowBackIcon } from "@chakra-ui/icons"
import { Button, Flex, Text } from "@chakra-ui/react"
import { SelectedUserSyncTable } from "../../../hooks/adminActions/userSync/useUserSyncTable"
import TabHeading from "../TabHeading"

interface UserSynTabHeaderProps {
    selectedTable: SelectedUserSyncTable
    onReturn: () => void
    onManualSync: () => void
    onConfigure: () => void
}

const UserSynTabHeader = ({ selectedTable, onManualSync, onConfigure, onReturn }: UserSynTabHeaderProps) => {
    return (
        <Flex flexDir='column' w='full'>
            { selectedTable === "Logs" && <Button
                onClick={onReturn}
                size='xs'
                minW='50px'
                aria-labelledby="close-partner-form-btn"
                w='100px'>
                    <ArrowBackIcon 
                        color='gray.700' 
                        role="img" 
                        focusable="true" 
                        aria-describedby="See All Syncs"
                        aria-hidden="true" />
                    <Text
                        color='gray.700'
                        fontFamily='Open sans'
                        fontWeight='400'
                        size='sm'
                        ml='10px'>See All Syncs</Text>
                </Button> }
            <Flex mt='12px' />
            <TabHeading text={ selectedTable === "Executions"? "User Sync" : "User Sync Execution Log"} />
            { selectedTable === "Executions" && <Flex alignItems='center' justifyContent='space-between' mt='16px' w='full'>
                <Text>
                    View previous syncs, configure settings, and run manual syncs here.
                </Text>
                <Flex alignItems='center' mt='5px'>
                    <Button
                        onClick={onManualSync}
                        variant='secondaryBlue600'
                        size='xs'
                        p='0 25px'
                        minW='5px'>
                            Run Manual Sync
                    </Button>
                    <Button
                        onClick={onConfigure}
                        variant='primaryBlue600'
                        size='xs'
                        p='0 25px'
                        minW='5px'
                        ml='8px'>
                            Configure
                    </Button>
                </Flex>
            </Flex> }
        </Flex>
    )
}

export default UserSynTabHeader