import { Flex, Text } from '@chakra-ui/react'
import { JobExecutionListResponse } from '../../../core/UserSync/UserSync.types'
import useUserSyncTableRows from '../../../hooks/adminActions/userSync/useUserSyncTableRows'
import ControlTableRow from '../ControlTableRow'
import JobExecutionStatusTag from './JobExecutionStatusTag'
import UserSyncTableData from './UserSyncTableData'

interface UserSyncLogsTableRowsProps {
    execution: JobExecutionListResponse
}

const UserSyncLogsTableRows = ({ execution }: UserSyncLogsTableRowsProps) => {
  const {
    getDuration, 
    getFormatedDate
  } = useUserSyncTableRows()

  return (
    <ControlTableRow>
      <UserSyncTableData width="auto">
        <Text>
          { getFormatedDate(execution.jobExecutionStartDateTime)}
        </Text>
      </UserSyncTableData>
      <UserSyncTableData width="200px">
        <Text>
          { getDuration(execution.jobExecutionStartDateTime, execution.jobExecutionEndDateTime) }s
        </Text>
      </UserSyncTableData>
      <UserSyncTableData width="200px">
        <JobExecutionStatusTag 
          executionStatus={execution.jobExecutionStatus} />
      </UserSyncTableData>
    </ControlTableRow>
  )
}

export default UserSyncLogsTableRows