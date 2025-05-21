import {
  Flex, Text
} from '@chakra-ui/react'
import { useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import useDataHealthInfo from '../../../hooks/dataHealth/useDataHealthInfo'
import useDataHealthDateInfo from '../../../hooks/useDataHealthDateInfo'
import CommonTooltip from '../CommonTooltip'
import RefreshBtn from '../RefreshBtn'
import DataHealthFetchErrorMessage from './DataHealthFetchErrorMessage'
import InstanceDataPreviewField from './InstanceDataPreviewField'
import { ODSInstance } from '../../../core/ODSInstance.types'

interface InstanceDataPreviewProps {
  instance: ODSInstance | null
}

const InstanceDataPreview = ({ instance }: InstanceDataPreviewProps) => {
  const adminConfig = useContext(adminConsoleContext)

  const { dataHealthInfo, refreshDataHealthInfo, dataHealthFetchError } = useDataHealthInfo({
    instance,
    usingSchoolYear: adminConfig ? adminConfig.useDataHealthWithSchoolYear : false
  })

  const { dataHealthDate, onUpdateDataHealthDate } = useDataHealthDateInfo()

  const onRefreshDataHealthInfo = async () => {
    await refreshDataHealthInfo()
    onUpdateDataHealthDate()
  }

  return (
    <Flex flexDir='column'>
      <Flex
        border='1px'
        borderColor='green.500'
        borderRadius='4px'
        flexDir='column'
        padding='16px'
        w='350px'
      >
        <Flex alignItems='center' w='full'>
          <Text
            color='green.600'
            fontFamily='Open sans'
            fontSize='22px'
            fontWeight='700'
            mr='10px'
          >Data Preview
          </Text>
          <CommonTooltip
            bg="blue.700"
            iconColor="green.500"
            label="Check that the data flowing in looks correct. If something looks off, check it out in Data Health Check"
            size="14px"
          />
        </Flex>
        {adminConfig && adminConfig.showDataHealth ? <>
          <Flex alignItems='center'>
            <Text
              color='gray.500'
              fontFamily='Open sans'
              fontStyle='italic'
              mt='10px'
              fontSize='xs'
            >
              {dataHealthDate}
            </Text>
            <RefreshBtn
              fontSize="20px"
              id="data-health"
              onAction={onRefreshDataHealthInfo}
            />
          </Flex>
          <Flex mt='18px' />
          {dataHealthFetchError ? <DataHealthFetchErrorMessage
            error={dataHealthFetchError}
          /> : <>
            <InstanceDataPreviewField
              text="Reporting Periods"
              value={dataHealthInfo.reportingPeriodExts}
            />
            <InstanceDataPreviewField
              text="Sections"
              value={dataHealthInfo.sections}
            />
            <InstanceDataPreviewField
              text="Student School Enrollments"
              value={dataHealthInfo.studentSchoolAssociations}
            />
            <InstanceDataPreviewField
              text="Student Course Enrollments (By Section)"
              value={dataHealthInfo.studentSectionAssociations}
            />
            <InstanceDataPreviewField
              text="Student Special Education Program Enrollments"
              value={dataHealthInfo.studentSpecialEducationProgramAssociations}
            />
            <InstanceDataPreviewField
              text="Student Daily Attendance"
              value={dataHealthInfo.studentSchoolAttendanceEvents}
            />
            <InstanceDataPreviewField
              text="Student Reporting Period Attendance"
              value={dataHealthInfo.basicReportingPeriodAttendances}
            />
            <InstanceDataPreviewField
              text="Student Discipline Incidents"
              value={dataHealthInfo.studentDisciplineIncidentBehaviorAssociations}
            />
            <InstanceDataPreviewField
              text="Student Course History"
              value={dataHealthInfo.courseTranscripts}
            />
            <InstanceDataPreviewField
              text="Staff Employment"
              value={dataHealthInfo.staffEducationOrganizationEmploymentAssociations}
            />
            <InstanceDataPreviewField
              text="Staff Assignment (By Role)"
              value={dataHealthInfo.staffEducationOrganizationAssignmentAssociations}
            />
            <InstanceDataPreviewField
              text="Staff Teaching Assignment (By Section)"
              value={dataHealthInfo.staffSectionAssociations}
            />
          </>}
        </> : <Text
          fontFamily='Open sans'
          fontSize='16px'
          fontWeight='600'
          mt='12px'
        >
          Coming Soon
        </Text>}
      </Flex>
      {false && <Text
        color='blue.500'
        fontFamily='Open sans'
        fontWeight='700'
        mt='16px'
        fontSize='sm'
        w='350px'
      >
        Something looks off? View this data in Data Health Check to start
        troubleshooting.
      </Text>}
    </Flex>
  )
}

export default InstanceDataPreview