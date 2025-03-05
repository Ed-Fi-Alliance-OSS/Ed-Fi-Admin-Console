// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.


const useEdfiUrls = () => {
  // const adminConfig = useContext(adminConsoleContext)
  // const [ edfiInfo, setEdfiInfo ] = useState<EdFiMetadata | null>(null)
  // const { getCurrentTenant } = useTenantInfo()

  // const generateBaseUrlFromTemplate = (edOrgId: string, applicationName: string) => {
  //   if (!adminConfig) {
  //     return ''
  //   }

  //   const prefix = `${edOrgId}-${applicationName}`
  //   const baseUrl = adminConfig?.edfiEndpoint.replace('{Prefix}', prefix)

  //   return baseUrl
  // }

  // const getEdFiDetailsSourceUrl = (configUrl: string) => {
  //   if (!configUrl.includes('{Prefix}')) {
  //     return configUrl
  //   }

  //   const currentTenant = getCurrentTenant()

  //   if (!currentTenant) {
  //     return configUrl
  //   }
            
  //   const applicationName = 'techconsole'
  //   const edOrgId = currentTenant.organizationIdentifier && currentTenant.organizationIdentifier.length > 0? currentTenant.organizationIdentifier : '000001'
  //   const url = generateBaseUrlFromTemplate(edOrgId, applicationName)

  //   return url
  // }

  // const getEdfiInfo = async () => {
  //   if (adminConfig?.edfiEndpoint) {
  //     try {
  //       const edfiUrl = getEdFiDetailsSourceUrl(adminConfig.edfiEndpoint)
  //       const result = await axios.get(edfiUrl)

  //       setEdfiInfo(result.data)
  //     } catch(ex) {
  //       console.error('error when trying to fetch edfi info')
  //     }
  //   }
  // }

  // useEffect(() => {
  //   getEdfiInfo()
  // }, [])

  return { edfiInfo: () => null }
}

export default useEdfiUrls