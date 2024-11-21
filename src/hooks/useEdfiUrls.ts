import axios from 'axios'
import {
  useState, useEffect, useContext 
} from 'react'
import { adminConsoleContext } from '../context/adminConsoleContext'
import { EdFiMetadata } from './useEdfiUrls.types'
import useTenantInfo from './useTenantInfo'

const useEdfiUrls = () => {
  const adminConfig = useContext(adminConsoleContext)
  const [edfiInfo, setEdfiInfo] = useState<EdFiMetadata | null>(null)
  const { getCurrentTenant } = useTenantInfo()

  const generateBaseUrlFromTemplate = (edOrgId: string, applicationName: string) => {
    if (!adminConfig) {
      return ''
    }

    const prefix = `${edOrgId}-${applicationName}`
    const baseUrl = adminConfig?.edfiEndpoint.replace('{Prefix}', prefix)

    return baseUrl
  }

  const getEdFiDetailsSourceUrl = (configUrl: string) => {
    if (!configUrl.includes('{Prefix}')) {
      return configUrl
    }

    const currentTenant = getCurrentTenant()

    if (!currentTenant) {
      return configUrl
    }
            
    const applicationName = 'techconsole'
    const edOrgId = currentTenant.organizationIdentifier && currentTenant.organizationIdentifier.length > 0? currentTenant.organizationIdentifier : '000001'
    const url = generateBaseUrlFromTemplate(edOrgId, applicationName)

    return url
  }

  const getEdfiInfo = async () => {
    if (adminConfig?.edfiEndpoint) {
      try {
        const edfiUrl = getEdFiDetailsSourceUrl(adminConfig.edfiEndpoint)
        const result = await axios.get(edfiUrl)

        setEdfiInfo(result.data)
      } catch(ex) {
        console.error('error when trying to fetch edfi info')
      }
    }
  }

  useEffect(() => {
    getEdfiInfo()
  }, [])

  return { edfiInfo }
}

export default useEdfiUrls