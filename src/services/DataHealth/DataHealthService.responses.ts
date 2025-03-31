// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ApiResponse } from "../Responses/ApiResponse"

export interface GetDataHealthDistrictDetailsResponse {
    localEducationAgencyId: number
    studentSpecialEducationProgramAssociations: number
    studentDisciplineIncidentBehaviorAssociations: number
    studentSchoolAssociations: number
    studentSchoolAttendanceEvents: number
    studentSectionAssociations: number
    staffEducationOrganizationAssignmentAssociations: number
    staffEducationOrganizationEmploymentAssociations: number
    staffSectionAssociations: number
    courseTranscripts: number
    basicReportingPeriodAttendances: number
    sections: number
    reportingPeriodExts: number	
    healthy: boolean
}

export type HealthCheckResponse = ApiResponse<GetDataHealthDistrictDetailsResponse>;