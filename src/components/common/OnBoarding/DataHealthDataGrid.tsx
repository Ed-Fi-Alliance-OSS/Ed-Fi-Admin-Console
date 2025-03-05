// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Grid } from '@chakra-ui/react'
import { DataHealthDetails } from '../../../core/dataHealth/DataHealth.types'
import DataHealthDetailsItem from './DataHealthDetailsItem'

interface DataHealthDataGridParams {
    dataHealth: DataHealthDetails
}

const DataHealthDataGrid = ({ dataHealth }: DataHealthDataGridParams) => {
  return (
    <Grid
      gap='20px'
      templateColumns='repeat(4, 170px)'
    >
      <DataHealthDetailsItem
        text="Reporting Periods"
        value={dataHealth.reportingPeriodExts}
      />

      <DataHealthDetailsItem
        text="Sections"
        value={dataHealth.sections}
      />

      <DataHealthDetailsItem
        text="Student School Enrollments"
        value={dataHealth.studentSchoolAssociations}
      />

      <DataHealthDetailsItem
        text="Student Course Enrollments (By Section)"
        value={dataHealth.studentSectionAssociations}
      />

      <DataHealthDetailsItem
        text="Student Special Education Program Enrollments"
        value={dataHealth.studentSpecialEducationProgramAssociations}
      />

      <DataHealthDetailsItem
        text="Student Daily Attendance"
        value={dataHealth.studentSchoolAttendanceEvents}
      />

      <DataHealthDetailsItem
        text="Student Reporting Period Attendance"
        value={dataHealth.basicReportingPeriodAttendances}
      />

      <DataHealthDetailsItem
        text="Student Discipline Incidents"
        value={dataHealth.studentDisciplineIncidentBehaviorAssociations}
      />

      <DataHealthDetailsItem
        text="Student Course History"
        value={dataHealth.courseTranscripts}
      />

      <DataHealthDetailsItem
        text="Staff Employment"
        value={dataHealth.staffEducationOrganizationEmploymentAssociations}
      />

      <DataHealthDetailsItem
        text="Staff Assignment (By Role)"
        value={dataHealth.staffEducationOrganizationAssignmentAssociations}
      />

      <DataHealthDetailsItem
        text="Staff Teaching Assignment (By Section)"
        value={dataHealth.staffSectionAssociations}
      />
    </Grid>
  )
}

export default DataHealthDataGrid