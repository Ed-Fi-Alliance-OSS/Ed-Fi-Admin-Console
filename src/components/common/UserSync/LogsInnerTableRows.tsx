import { Flex, Text } from "@chakra-ui/react"
import { JobExecutionLogEntry } from "../../../core/UserSync/UserSync.types"
import useUserSyncTableRows from "../../../hooks/adminActions/userSync/useUserSyncTableRows"
import ControlTableRow from "../ControlTableRow"
import LogStatusTag from "./LogStatusTab"
import UserSyncTableData from "./UserSyncTableData"

interface LogsInnerTableRowsProps {
    logs: JobExecutionLogEntry[]
}

const LogsInnerTableRows = ({ logs }: LogsInnerTableRowsProps) => {
    const {
        getFormatedDate
    } = useUserSyncTableRows()

    return (
        <>
            {logs.map((log, index) => 
                <ControlTableRow key={index}>
                        <UserSyncTableData width="200px">
                            <LogStatusTag 
                                messageTypeValue={log.messageType} />
                        </UserSyncTableData>
                        <UserSyncTableData width="auto">
                            <Flex w='full'>
                                <Text whiteSpace='initial' w='800px'>
                                    { log.message }
                                </Text>
                            </Flex>
                        </UserSyncTableData>
                        <UserSyncTableData width="auto">
                            <Text>
                                { getFormatedDate(log.loggedDateTime) }
                            </Text>
                        </UserSyncTableData>
                </ControlTableRow>
            )}
        </>
    )
}

export default LogsInnerTableRows