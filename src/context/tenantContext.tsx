import {
  useApiService, useConfig
} from '@edfi/admin-console-shared-sdk'
import {
  createContext, FC, ReactNode, useContext,
  useEffect,
  useState
} from 'react'
import { useSessionStorage } from 'react-use'
import { Tenant } from '../core/Tenant.types'
import { usePluginContext } from '../plugins/BasePlugin'

// Define the type for our context data structure
interface TenantsContextType {
  tenants: Tenant[]
  selectedTenant?: Tenant
  selectedTenantId?: string
  fetchTenants: () => void
}

// Create a context with a default value of undefined
const TenantsContext = createContext<TenantsContextType | undefined>(undefined)

// Define props for the provider component
interface TenantsContextProviderProps {
  children: ReactNode;
}

// Create the provider component
export const TenantsContextProvider: FC<TenantsContextProviderProps> = ({ children }) => {
  const { config } = useConfig()
  const { functionalities } = usePluginContext()
  const apiService = functionalities.ApiService?.(config, useApiService)
  const [ tenants, setTenants ] = useState<Tenant[]>([])
  const [ selectedTenant, setSelectedTenant ] = useState<Tenant>()
  const [ selectedTenantName ] = useSessionStorage('selectedTenant', '', true)
  const [ selectedTenantId, setSelectedTenantId ] = useState<string>()

  async function fetchTenants () {
    if(!apiService) {
      return
    }

    // Fetch tenants from the API
    const tenants = await apiService?.tenants?.getAll?.()
    console.log('🚨 tenants', tenants)
    setTenants(tenants)
  }

  useEffect(() => {
    fetchTenants()
  }, [  ])
  
  useEffect(() => {
    if(!tenants) {
      return
    }

    if(!selectedTenantName) {
      return
    }

    const _t = tenants.find(t => t.document.name === selectedTenantName)
    setSelectedTenant(_t)
    setSelectedTenantId(_t?.tenantId)
  }, [ tenants, selectedTenantName ])

  

  // Context value with both data and utility functions
  const contextValue: TenantsContextType = {
    tenants,
    selectedTenant,
    selectedTenantId,
    fetchTenants
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
