// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  useContext, useEffect, useState 
} from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { EdFiAdminConnection } from '../../../core/EdFiAdmin/EdFiAdmin.types'
import useEdFiAdminConnectionsService from '../../../services/AdminActions/EdFiAdmin/Connections/EdFiAdminConnectionsService'

const useEdFiAdminConnectionsList = () => {
  const [ connectionsList, setConnectionsList ] = useState<EdFiAdminConnection[]>([])
  const adminConfig = useContext(adminConsoleContext)
  const { getConnectionsList } = useEdFiAdminConnectionsService()

  const fetchConnectionsList = async () => {
    if (!adminConfig) {
      return
    } 

    const result = await getConnectionsList(adminConfig.actionParams, {
      pageIndex: 0,
      pageSize: 100
    })

    if (result.type === 'Error') {
      return
    } 

    setConnectionsList(result.data.data)
  }

  useEffect(() => {
    fetchConnectionsList()
  }, [])

  return { connectionsList }
}

export default useEdFiAdminConnectionsList