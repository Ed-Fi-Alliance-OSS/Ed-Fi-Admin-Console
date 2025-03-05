// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export interface DataHealthDetails {
    localEducationAgencyId: number
    studentSpecialEducationProgramAssociations?: number | null
    studentDisciplineIncidentBehaviorAssociations?: number | null 
    studentSchoolAssociations?: number | null 
    studentSchoolAttendanceEvents?: number | null 
    staffSectionAssociations?: number | null 
    staffEducationOrganizationAssignmentAssociations?: number | null 
    staffEducationOrganizationEmploymentAssociations?: number | null 
    courseTranscripts?: number | null 
    studentSectionAssociations?: number | null
    basicReportingPeriodAttendances?: number | null 
    sections?: number | null 
    reportingPeriodExts?: number | null 
}