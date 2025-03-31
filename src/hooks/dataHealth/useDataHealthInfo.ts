// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  useContext, useEffect, useState 
} from 'react'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import { DataHealthDetails } from '../../core/dataHealth/DataHealth.types'
import useDataHealthService from '../../services/DataHealth/useDataHealthService'
import {
  HttpServiceRequestError, HttpServiceResponse 
} from '../../services/HttpService/HttpService.response.types'
import { ODSInstance } from '../../core/ODSInstance.types'
import { GetDataHealthDistrictDetailsResponse } from '../../services/DataHealth/DataHealthService.responses'
import useOdsInstanceYear from '../odsInstances/useOdsInstanceYear'

const initialDataHealth: DataHealthDetails = {
  localEducationAgencyId: 0,
  studentSpecialEducationProgramAssociations: null,
  studentDisciplineIncidentBehaviorAssociations: null,
  studentSchoolAssociations: null, 
  studentSchoolAttendanceEvents: null,
  staffSectionAssociations: null,
  staffEducationOrganizationAssignmentAssociations: null,
  staffEducationOrganizationEmploymentAssociations: null,
  courseTranscripts: null,
  studentSectionAssociations: null,
  basicReportingPeriodAttendances: null,
  sections: null,
  reportingPeriodExts: null
}

export interface DataHealthFetchError {
    message: string 
    errorStatus: number
}

interface UseDataHealthInfoProps {
    instance: ODSInstance | null
    usingSchoolYear: boolean 
}

const useDataHealthInfo = ({ instance, usingSchoolYear }: UseDataHealthInfoProps) => {
  const [ dataHealthInfo, setDataHealthInfo ] = useState<DataHealthDetails>({ ...initialDataHealth })
  const { getDataHealthInfo, getOdsInstanceDataHealthInfo } = useDataHealthService()
  const adminConfig = useContext(adminConsoleContext)
  const [ dataHealthFetchError, setDataHealthFetchError ] = useState<DataHealthFetchError>()

  const {
    getInstanceYear
  } = useOdsInstanceYear()

  const fetchDataHealthInfo = async () => {
    if (adminConfig) {
      if (usingSchoolYear && !instance) {
        return
      } 

      let result: HttpServiceResponse<GetDataHealthDistrictDetailsResponse> | HttpServiceRequestError | null = null

      if (!usingSchoolYear) {
        result = (await getDataHealthInfo(instance?.id)) ?? null
      }

      if (usingSchoolYear && instance) {
        result = await fetchDataHealthInfoFromSchoolYear()
      }

      if (!result) {
        return
      } 

      if (result.type === 'Response') {
        setDataHealthFetchError(undefined)
        return setDataHealthInfo(result.data)
      }

      setDataHealthFetchError(createFetchError(result))
    }
  }

  const fetchDataHealthInfoFromSchoolYear = async () => {
    if (!adminConfig) {
      return null
    }

    if (!instance) {
      return null
    }

    const year = getInstanceYear(instance)

    if (!year) {
      return null
    }

    return await getOdsInstanceDataHealthInfo(adminConfig.actionParams, year)
  }

  const refreshDataHealthInfo = async () => fetchDataHealthInfo()

  const createFetchError = (error: HttpServiceRequestError): DataHealthFetchError => {
    const message = 'Data was unable to be loaded.'
    let errorStatus = 0

    if (error.statusCode === 'unknown') {
      errorStatus = 500
    } else {
      errorStatus = error.statusCode
    }

    return {
      message,
      errorStatus
    }
  }

  useEffect(() => {
    fetchDataHealthInfo()
  }, [ instance ])

  return {
    dataHealthInfo,
    refreshDataHealthInfo,
    dataHealthFetchError
  }
}

export default useDataHealthInfo