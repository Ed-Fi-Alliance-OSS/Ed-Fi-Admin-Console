import { useApiService } from '@edfi/admin-console-shared-sdk'
import {
  useEffect, useState
} from 'react'
import { useTenantContext } from '../../context/tenantContext'
import { InstanceOperationStatus } from '../../core/ODSInstance.types'
import { EdFiMetadata } from '../useEdfiUrls.types'

const cached = new Map<string, EdFiMetadata>()

export function useEdfiMetadata() {
  const { api } = useApiService('')
  const { selectedTenant, tenants, fetchTenants } = useTenantContext()
  const [ edfiMetadata, setEdfiMetadata ] = useState<EdFiMetadata>()
  const [ edFiStatus, setEdFiStatus ] = useState<InstanceOperationStatus>('Offline')
  const [ metaDataLoading, setMetaDataLoading ] = useState(false)

  useEffect(() => {
    fetchTenants()
  }, [])

  useEffect(() => {
    
    async function extractEdfiMetadata() {
      
      if(!selectedTenant) {
        return
      }

      if(!selectedTenant?.document.edfiApiDiscoveryUrl) {
        setEdFiStatus('Offline')
        return
      }

      try {
        if(cached.has(selectedTenant.document.edfiApiDiscoveryUrl)) {
          setEdFiStatus('Operational')
          setEdfiMetadata(cached.get(selectedTenant.document.edfiApiDiscoveryUrl))
          return
        }

        setMetaDataLoading(true)
        const metadata = await api.get(selectedTenant.document.edfiApiDiscoveryUrl).then(resp => resp.data)
        cached.set(selectedTenant.document.edfiApiDiscoveryUrl, metadata)
        setEdFiStatus('Operational')
        setEdfiMetadata(metadata)
        setMetaDataLoading(false)
      } catch (e) {
        setEdFiStatus('Offline')
        setMetaDataLoading(false)
        return
      }
    }

    extractEdfiMetadata()
  }, [ tenants, selectedTenant ])

  return {
    edfiMetadata,
    edFiStatus,
    metaDataLoading
  }
}