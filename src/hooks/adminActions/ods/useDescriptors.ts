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
import { Descriptor } from '../../../services/AdminActions/Ods/ODSService.results'

const useDescriptors = () => {
  const { edxAppConfig, auth } = useContext(TEEAuthDataContext)
  const adminConfig = useContext(adminConsoleContext)
  const { getDescriptors } = useODSService()
  const [ descriptorsList, setdescriptorsList ] = useState<Descriptor[]>([])
  const [ isFetchingdescriptors, setIsFetchingdescriptors ] = useState(false)

  const fetchDescriptors = async () => {
    if (edxAppConfig && auth && auth.user && adminConfig) {
      setIsFetchingdescriptors(true)
      const result = await getDescriptors(adminConfig.edfiActionParams)
      setIsFetchingdescriptors(false)

      if (result.type === 'Response') {
        setdescriptorsList(result.data)
      }
    }
  }

  useEffect(() => {
    fetchDescriptors()
  }, [])

  return {
    descriptorsList,
    isFetchingdescriptors
  }
}

export default useDescriptors