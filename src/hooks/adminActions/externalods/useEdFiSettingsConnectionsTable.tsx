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
import {
  GetAllConnectionsRequest, VerifyEdFiAdminConnectionRequest 
} from '../../../services/AdminActions/EdFiAdmin/Connections/EdfiAdminConnectionsService.requests'
import {
  EdFiConnectionFormMode, EdFiConnectionFormData 
} from '../../edfi/useEdFiConnectionForm.types'
import { EdFiSettingsConnectionsTableItem } from './useEdFiSettingsConnectionsTable.types'
import useControlTable from '../../controlTable/useControlTable' 
import useDebounce from '../../useDebounce'
import { DataFetchParams } from '../../../core/controlTable'

export type ConnectionDataFilters = 'empty' | 'message'

const useEdFiSettingsConnectionsTable = () => {
  const adminConfig = useContext(adminConsoleContext)
  const { getConnectionsList } = useEdFiAdminConnectionsService()

  const {
    orderBy,
    paginatedData,
    setPaginatedData,
    minPerPage,
    maxPerPage,
    totalPages,
    isFetchingData,
    setIsFetchingData,
    onDecrementPageSize,
    onIncrementPageSize,
    canNextPage,
    canPreviousPage,
    goToInitialPage,
    goToNextPage,
    goToPreviousPage,
    gotToLastPage,
    onSortDesc,
    onSortAsc,
  } = useControlTable<EdFiAdminConnection, ConnectionDataFilters>({ 
    initialPageSize: 2,
    initialOrder: 'connectionName',
    initialOrderType: 'desc',
    initialMinPerPage: 1,
    initialMaxPerPage: 10
  })

  const inputTimeoutMiliseconds = 1000
  const debouncedPaginatedData = useDebounce(paginatedData, inputTimeoutMiliseconds)
  const [ mode, setMode ] = useState<EdFiConnectionFormMode>('Edit')
  const [ showConnectionModal, setShowConnectionModal ] = useState(false)
  const [ showConfirmationModal, setShowConfirmationModal ] = useState(false)
  const [ connectionDataToEdit, setConnectionDataToEdit ] = useState<EdFiConnectionFormData>()
  const { verifyConnection } = useEdFiAdminConnectionsService()
  const [ connectionStatusList, setConnectionStatusList ] = useState<EdFiSettingsConnectionsTableItem[]>([])
  const [ isLoadingConnectionStatus, setIsLoadingConnectionStatus ] = useState(false)

  const onShowConnectionModal = (connectionId?: string) => {
    if (connectionId) {
      const connectionToEdit = paginatedData.data.find(connection => connection.id === connectionId)
            
      if (!connectionToEdit) {
        return
      } 
            
      // console.log('to edit', connectionToEdit)
            
      let key = ''
      let secret = ''
            
      if (connectionToEdit.tiers.length > 0) {
        key = connectionToEdit.tiers[0].odsApiConnection.clientId
        secret = connectionToEdit.tiers[0].odsApiConnection.clientSecret
      }
            
      setConnectionDataToEdit({
        connectionId,
        baseUrl: getBaseUrl(connectionToEdit),
        key,
        secret,
        connectionName : connectionToEdit.connectionName
      })

      setMode('Edit')
    } else {
      setMode('Add')
    }
        
    console.log('show connection modal')
    setShowConnectionModal(true)
    setShowConnectionModal(true)
  }

  const onHideConnectionModal = async () => {
    setConnectionDataToEdit({
      connectionId: '',
      baseUrl: '',
      key: '',
      secret: ''
    })

    setShowConnectionModal(false)

    await onVerifyAllConnections(paginatedData.data)
  }

  const onShowConfirmModal = () => setShowConfirmationModal(true)
  const onHideConfirmationModal = () => setShowConfirmationModal(false)

  const onConfirmClose = () => {
    onHideConnectionModal()
    onHideConfirmationModal()
  }

  const getBaseUrl = (connection: EdFiAdminConnection) => {
    if (connection.tiers.length === 0) {
      return '/'
    }

    if (connection.tiers[0].odsApiConnection.metadataUrl) {
      return connection.tiers[0].odsApiConnection.metadataUrl
    }

    if (connection.tiers[0].odsApiConnection.tokenUrl) {
      const simpleUrl = connection.tiers[0].odsApiConnection.tokenUrl.replace('/oauth/token', '')

      if (simpleUrl.includes('/{InstanceId}')) {
        return simpleUrl.replace('/{InstanceId}', '')
      }

      return simpleUrl
    }

    return ''
  }

  const verifyConnections = async (connectionsList: EdFiAdminConnection[]) => {
    await onVerifyAllConnections(connectionsList)
  }
    
  const onVerifyAllConnections = async (connectionsList: EdFiAdminConnection[]) => {
    if (!adminConfig) {
      return
    } 

    const nconnectionsStatusList: EdFiSettingsConnectionsTableItem[] = []

    setIsLoadingConnectionStatus(true)
    for (let index = 0; index < connectionsList.length; index++) {
      const connectionId = connectionsList[index].id

      const verifyConnectionRequest: VerifyEdFiAdminConnectionRequest = {
        tenantId: adminConfig.actionParams.tenantId,
        connectionId,
        deleteConnection: false
      }

      const verifyConnectionResponse = await verifyConnection(adminConfig.actionParams, verifyConnectionRequest)
    
      const connectionItem: EdFiSettingsConnectionsTableItem = {
        connectionId,
        status: 'Unknown'
      }

      // console.log("verify connection response", verifyConnectionResponse, connectionId)

      if (verifyConnectionResponse.type === 'Error') {
        connectionItem.status = 'URL Error'
      } else if(verifyConnectionResponse.data.status === 'failure') {
        connectionItem.status = 'Credential Error'
      } else {
        connectionItem.status = 'Connected'
      }

      // console.log('new connection item', connectionItem, connectionId)

      nconnectionsStatusList.push(connectionItem)
    }

    // console.log("connection status list", nconnectionsStatusList)
    setIsLoadingConnectionStatus(false)
    setConnectionStatusList(nconnectionsStatusList)
  }

  const onChangePage = () => setIsFetchingData(true)

  const onGoToInitialPage = () => {
    onChangePage()
    goToInitialPage()
  }

  const onGoToPreviousPage = () => {
    onChangePage()
    goToPreviousPage()
  }

  const onGoToNextPage = () => {
    onChangePage()
    goToNextPage()
  }

  const onGoToLastPage = () => {
    onChangePage()
    gotToLastPage()
  }

  const fetchConnectionsList = async ({ pageIndex, pageSize, orderBy }: DataFetchParams<ConnectionDataFilters>) => {
    if (!adminConfig) {
      return
    } 

    setIsFetchingData(true)
    setPaginatedData({
      pageIndex,
      pageSize,
      count: paginatedData.count,
      data: []
    })

    const request: GetAllConnectionsRequest = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      orderBy: `${orderBy.field} ${orderBy.order}`
    }

    const getConnectionsResult = await getConnectionsList(adminConfig.actionParams, request)
    setIsFetchingData(false)
        
    if (getConnectionsResult.type === 'Error') {
      return
    } 
            
    setPaginatedData({
      pageIndex: getConnectionsResult.data.pageIndex,
      pageSize: getConnectionsResult.data.pageSize,
      count: getConnectionsResult.data.count,
      data: getConnectionsResult.data.data
    })

    await verifyConnections(getConnectionsResult.data.data)
  }

  useEffect(() => {
    fetchConnectionsList({
      pageIndex: paginatedData.pageIndex,
      pageSize: paginatedData.pageSize,
      orderBy,
      filterBy: {
        field: 'message',
        value: '' 
      }
    })

    setMode('Edit')
  }, [
    debouncedPaginatedData.pageIndex, debouncedPaginatedData.pageSize, orderBy 
  ])

  return {
    paginatedData, 
    minPerPage,
    maxPerPage,
    totalPages,
    isFetchingData,
    onDecrementPageSize,
    onIncrementPageSize,
    canNextPage,
    canPreviousPage,
    onGoToInitialPage,
    onGoToLastPage,
    onGoToNextPage,
    onGoToPreviousPage,
    orderBy,
    onSortAsc,
    onSortDesc,
    connectionStatusList,
    mode, 
    getBaseUrl,
    isLoadingConnectionStatus,
    showConnectionModal,
    showConfirmationModal,
    connectionDataToEdit,
    onConfirmClose,
    onShowConnectionModal,
    onShowConfirmModal,
    onHideConfirmationModal,
    onHideConnectionModal
  }
}

export default useEdFiSettingsConnectionsTable