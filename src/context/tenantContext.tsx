// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import {
  createContext, FC, ReactNode, useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { useSessionStorage } from 'react-use'
import { InstanceOperationStatus } from '../core/ODSInstance.types'
import { Tenant } from '../core/Tenant.types'
import { EdFiMetadata } from '../hooks/useEdfiUrls.types'
import { usePluginContext } from '../plugins/BasePlugin'
import { useNavigate } from 'react-router-dom'

// Define the type for our context data structure
interface TenantsContextType {
  tenants?: Tenant[]
  selectedTenant?: Tenant
  selectedTenantId?: number
  fetchTenants: () => void
  edfiMetadata?: EdFiMetadata
  edFiStatus?: InstanceOperationStatus
  metaDataLoading?: boolean
}

// Create a context with a default value of undefined
const TenantsContext = createContext<TenantsContextType | undefined>(undefined)

// Define props for the provider component
interface TenantsContextProviderProps {
  children: ReactNode
}

// Create the provider component
export const TenantsContextProvider: FC<TenantsContextProviderProps> = ({ children }) => {
  const { config } = useConfig()
  const { functionalities } = usePluginContext()
  const adminApi = useApiService(config.api.edfiAdminApiBaseUri)

  const apiService = functionalities.ApiService?.(config, () => ({
    api: adminApi.api,
    handleAxiosError: adminApi.handleAxiosError,
    createDefaultError: adminApi.createDefaultError,
    get: adminApi.get,
    post: adminApi.post,
    put: adminApi.put
  }))

  const navigate = useNavigate()
  const [ tenants, setTenants ] = useState<Tenant[]>()
  const [ selectedTenant, setSelectedTenant ] = useState<Tenant>()
  const [ selectedTenantName, setSelectedTenantName ] = useSessionStorage('selectedTenant', '', true)
  const [ selectedTenantId, setSelectedTenantId ] = useState<number>()
  const [ edfiMetadata, setEdfiMetadata ] = useState<EdFiMetadata>()
  const [ edFiStatus, setEdFiStatus ] = useState<InstanceOperationStatus>('Offline')
  const [ metaDataLoading, setMetaDataLoading ] = useState(false)
  const { api } = useApiService('')

  async function fetchMetadata() {
    // get the current tenant
    if (!selectedTenant) {
      return
    }

    if (!selectedTenant?.document.edfiApiDiscoveryUrl) {
      setEdFiStatus('Offline')
      return
    }

    try {
      // We need to replace host.docker.internal with localhost for the API call to work on docker.
      if (selectedTenant.document.edfiApiDiscoveryUrl?.includes('host.docker.internal')) {
        selectedTenant.document.edfiApiDiscoveryUrl = selectedTenant.document.edfiApiDiscoveryUrl.replace('host.docker.internal', 'localhost')
      }

      setMetaDataLoading(true)
      const metadata = await api.get(selectedTenant.document.edfiApiDiscoveryUrl).then(resp => resp.data)
      setEdFiStatus('Operational')
      setEdfiMetadata(metadata)
      setMetaDataLoading(false)
    } catch (e) {
      setEdFiStatus('Offline')
      setMetaDataLoading(false)
      return
    }

    // setEdfiMetadata
  }

  useEffect(() => {
    const _t = tenants?.find(t => t.document.name === selectedTenantName)

    if (_t) {
      setSelectedTenant(_t)
      setSelectedTenantId(_t.tenantId)
    }
  }, [ selectedTenantName, tenants ])

  useEffect(() => {
    fetchMetadata()
  }, [ selectedTenant ])

  async function fetchTenants() {

    if (!apiService) {
      return
    }


    // Fetch tenants from the API
    const tenants = await apiService?.tenants?.getAll?.()

    setTenants(tenants)
  }

  useEffect(() => {
    if (!Array.isArray(tenants)) {
      fetchTenants()
    }
  })

  useEffect(() => {

    if (!Array.isArray(tenants) || tenants.length === 0) {
      return
    }

    if (!selectedTenantName) {
      setSelectedTenantName(tenants?.at(0)?.document?.name ?? '')
      return
    }

  }, [ tenants, selectedTenantName ])

  useEffect(() => {
    if (Array.isArray(tenants) && tenants.length > 0) {
      // if no tenant is selected, select the first tenant
      if (!selectedTenantName) {
        setSelectedTenantName(tenants[0].document.name)
        window.location.reload()
      }

      const _t = tenants.find(t => t.document.name === selectedTenantName)

      // if the selected tenant is not in the list of tenants, select the first tenant
      if (!_t) {
        setSelectedTenantName(tenants[0].document.name)
        window.location.reload()
      }
    }
  }, [ tenants ])

  const previousTenantIdRef = useRef<number | undefined>(selectedTenantId)

  useEffect(() => {
    if (selectedTenantId && previousTenantIdRef.current !== selectedTenantId) {
      navigate('/', { replace: true })
    }

    previousTenantIdRef.current = selectedTenantId
  }, [ selectedTenantId, navigate ])

  // Context value with both data and utility functions
  const contextValue: TenantsContextType = {
    tenants,
    selectedTenant,
    selectedTenantId,
    fetchTenants,
    edfiMetadata,
    edFiStatus,
    metaDataLoading
  }

  return (
    <TenantsContext.Provider value={contextValue}>
      {children}
    </TenantsContext.Provider>
  )
}

// Custom hook to use the mock data context
export const useTenantContext = (): TenantsContextType => {
  const context = useContext(TenantsContext)

  if (!context) {
    throw new Error('useTenantContext must be used within a TenantsContextProvider')
  }

  return context
}
