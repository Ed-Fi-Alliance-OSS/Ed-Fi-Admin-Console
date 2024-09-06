import { Tenant, UserProfileContext } from "@edwire/edx-portal-shared"
import { useContext } from "react"

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