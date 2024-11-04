import { Tenant, UserProfileContext } from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'

const useTenantInfo = () => {
  const { userProfile } = useContext(UserProfileContext)

  const getCurrentTenant = (): Tenant | undefined => {
    if (userProfile) {
      const currentTenant = userProfile.selectedTenant

      return currentTenant
    }
  }

  return {
    getCurrentTenant
  }
}

export default useTenantInfo