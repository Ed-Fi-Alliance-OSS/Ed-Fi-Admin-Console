import { useContext, useEffect, useState } from "react"
import { ODSInstance } from "../../core/ODSInstance.types"
import useOdsInstanceService from "../../services/ODSInstances/OdsInstanceService"
import { adminConsoleContext } from "../../context/adminConsoleContext"
import { GetOdsInstancesListRequest } from "../../services/ODSInstances/OdsInstanceService.requests"
import useEDXToast from "../common/useEDXToast"

const useOdsDefaultInstance = () => {
    const adminConfig = useContext(adminConsoleContext)
    const [ defaultInstance, setDefaultInstance ] = useState<ODSInstance | null>(null)

    const {
        getOdsInstancesList
    } = useOdsInstanceService()

    const {
        errorToast
    } = useEDXToast(7000)

    const getDefaultInstance = async () => {
        if (!adminConfig)
            return 

        const request: GetOdsInstancesListRequest = {
            pageIndex: 0,
            pageSize: 1,
            filter: "isDefault == true"
        }

        const result = await getOdsInstancesList(
            adminConfig.actionParams, 
            request)

        if (result.type === 'Error') {
            errorToast("Failed to fetch default instance")

            return 
        }

        if (result.data.data.length == 0) {
            errorToast("Did not find a default instance")

            return 
        }

        setDefaultInstance(result.data.data[0])
    }

    const onRefreshDefaultInstance = async () => await getDefaultInstance()

    useEffect(() => {
        getDefaultInstance()
    }, [])

    return {
        defaultInstance,
        onRefreshDefaultInstance
    }
}

export default useOdsDefaultInstance