import {
  Tenant
} from '@edfi/admin-console-shared-sdk'
import { useTenantContext } from '../context/tenantContext'

const useTenantInfo = () => {
  const { selectedTenant } = useTenantContext()

  const getCurrentTenant = (): Tenant | undefined => {
    if (selectedTenant) {
      return selectedTenant
    }
  }

  return { getCurrentTenant }
}

export default useTenantInfo