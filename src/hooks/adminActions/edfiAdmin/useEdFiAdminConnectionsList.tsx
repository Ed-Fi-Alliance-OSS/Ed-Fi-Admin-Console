import { useContext, useEffect, useState } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { EdFiAdminConnection } from '../../../core/EdFiAdmin/EdFiAdmin.types'
import useEdFiAdminConnectionsService from '../../../services/AdminActions/EdFiAdmin/Connections/EdFiAdminConnectionsService'

const useEdFiAdminConnectionsList = () => {
  const [ connectionsList, setConnectionsList ] = useState<EdFiAdminConnection[]>([])
  const adminConfig = useContext(adminConsoleContext)
  const { getConnectionsList } = useEdFiAdminConnectionsService()

  const fetchConnectionsList = async () => {
    if (!adminConfig)
      return 

    const result = await getConnectionsList(adminConfig.actionParams, {
      pageIndex: 0,
      pageSize: 100
    })

    if (result.type === 'Error')
      return 

    setConnectionsList(result.data.data)
  }

  useEffect(() => {
    fetchConnectionsList()
  }, [])

  return {
    connectionsList
  }
}

export default useEdFiAdminConnectionsList