import { Button, Flex, Text } from '@chakra-ui/react'
import { JobExecutionListResponse } from '../../../core/UserSync/UserSync.types'
import useUserSyncTableRows from '../../../hooks/adminActions/userSync/useUserSyncTableRows'
import ControlTableRow from '../ControlTableRow'
import JobExecutionStatusTag from './JobExecutionStatusTag'
import UserSyncTableData from './UserSyncTableData'

interface UserSyncTableRowsProps {
    executionsList: JobExecutionListResponse[]
    onShowLogs: (executionId: string) => void
}

const UserSyncTableRows = ({ executionsList, onShowLogs }: UserSyncTableRowsProps) => {
  const {
    getFormatedDate,
    getDuration
  } = useUserSyncTableRows()

  return (
    <>
      {executionsList.map((execution, index) => 
        <ControlTableRow key={index}>
          <UserSyncTableData width="auto">
            <Text>
              { getFormatedDate(execution.jobExecutionStartDateTime) }
            </Text>
          </UserSyncTableData>
          <UserSyncTableData width="auto">
            <Text>
              { getDuration(execution.jobExecutionStartDateTime, execution.jobExecutionEndDateTime) }s
            </Text>
          </UserSyncTableData>
          <UserSyncTableData width="auto">
            <JobExecutionStatusTag 
              executionStatus={execution.jobExecutionStatus} />
          </UserSyncTableData>
          <UserSyncTableData width="auto">
            <Flex>
              <Button
                onClick={() => onShowLogs(execution.jobExecutionId)}
                variant='primaryBlue600'
                size='xs'
                padding='0 25px'
                minW='65px'
                w='65px'
                ml="auto">View Log</Button>
            </Flex>
          </UserSyncTableData>
        </ControlTableRow>
      )}
    </>
  )
}

export default UserSyncTableRows