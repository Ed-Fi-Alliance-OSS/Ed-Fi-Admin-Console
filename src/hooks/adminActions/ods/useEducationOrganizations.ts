// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { TEEAuthDataContext } from '@edfi/admin-console-shared-sdk'
import {
  useState, useEffect, useContext 
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import useODSService from '../../../services/AdminActions/Ods/ODSService'
import { EducationOrganization } from '../../../services/AdminActions/Ods/ODSService.results'

const useEducationsOrganizations = () => {
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const adminConfig = useContext(adminConsoleContext)
  const { getEducationOrganizations } = useODSService()
  const [ educationOrganizationsList, setEducationOrganizationsList ] = useState<EducationOrganization[]>([])
  const [ isFetchingEducationOrganizations, setIsFetchingEducationOrganizations ] = useState(false)

  const fetchEducationOrganizations = async () => {
    if (edxAppConfig && auth && auth.user && adminConfig) {
      setIsFetchingEducationOrganizations(true)
      const result = await getEducationOrganizations(adminConfig.edfiActionParams)
      setIsFetchingEducationOrganizations(false)

      if (result.type === 'Response') {
        setEducationOrganizationsList(result.data)
      }
    }
  }

  useEffect(() => {
    fetchEducationOrganizations()
  }, [])

  return {
    educationOrganizationsList,
    isFetchingEducationOrganizations
  }
}

export default useEducationsOrganizations