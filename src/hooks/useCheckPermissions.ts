import { UserProfileContext } from "@edfi/admin-console-shared-sdk"
import { useContext, useEffect, useState } from "react"
import { adminConsoleContext } from "../context/adminConsoleContext"
import usePermissionsService from "../services/AdminActions/Permissions/PermissionsService"

const useCheckPermissions = () => {
    const adminConfig = useContext(adminConsoleContext)
    const { userProfile } = useContext(UserProfileContext)
    const { checkPermissions } = usePermissionsService()
    const [ finishedCheckedPermissions, setFinishedCheckingPermissions ] = useState(false)

    const onCheckPermissions = async () => {
        if (adminConfig) {
            console.log('check permissions')
            const actionParams = adminConfig.actionParams

            await checkPermissions(actionParams)
            setFinishedCheckingPermissions(true)
        }
    }

    useEffect(() => {
        if (userProfile) onCheckPermissions()
    }, [ userProfile ]) 

    return {
        finishedCheckedPermissions
    }
}

export default useCheckPermissions