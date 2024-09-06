import { TEEAuthDataContext, UserProfileContext } from '@edwire/edx-portal-shared'
import { useState, useEffect, useContext } from 'react'
import { adminConsoleContext } from '../../../context/adminConsoleContext'
import { Tenant } from '../../../core/Tenant.types'
import { PostDomainRequest } from '../../../services/AdminActions/Domains/DomainService.request'
import useDomainsService from '../../../services/AdminActions/Domains/DomainsService'
import useTenantService from '../../../services/AdminActions/Tenant/TenantService'

const useTenant = () => {
    const { userProfile } = useContext(UserProfileContext)
    const { getTenant, updateTenant } = useTenantService()
    const { auth, edxAppConfig } = useContext(TEEAuthDataContext)
    const adminConfig = useContext(adminConsoleContext)
    const [tenant, setTenant] = useState<Tenant | null>(null)
    const [isAddingDomain, setIsAddingDomain] = useState(false)
    const [isRemovingDomain, setIsRemovingDomain] = useState(false)
    const { createDomain, deleteDomain } = useDomainsService()

    const fetchTenant = async () => {
        if (auth && auth.user && userProfile && edxAppConfig && adminConfig) {
            const response = await getTenant(adminConfig.actionParams)

            if (response.type === 'Response') {
                setTenant(response.data)
                // console.log("fetch tenant result", response.data)
            }
        }
    }

    const onAddDomain = async (domainName: string) => {
        if (userProfile && auth && auth.user && edxAppConfig && adminConfig) {
            const request: PostDomainRequest = {
                tenantId: userProfile.tenantId,
                domainName: domainName,
                domainStatus: "Unknown"
            }

            setIsAddingDomain(true)
            const result = await createDomain(adminConfig.actionParams, request)
            setIsAddingDomain(false)

            if (result.type === 'Response')
                await fetchTenant()
        }
    }

    const onRemoveDomain = async (domainName: string) => {
        if (auth && edxAppConfig && auth.user && userProfile && tenant && adminConfig) {

            setIsRemovingDomain(true)
            const result = await deleteDomain(adminConfig.actionParams, domainName)
            setIsRemovingDomain(false)

            if (result.type === 'Response') {
                await fetchTenant()
            }
        }
    }

    useEffect(() => {
        fetchTenant()
    }, [])

    return {
        tenant,
        isAddingDomain,
        isRemovingDomain,
        onAddDomain,
        onRemoveDomain
    }
}

export default useTenant