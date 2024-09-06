import { useEffect, useState } from "react"
import { ODSInstance } from "../../core/ODSInstance.types"
import useHttpService from "../http/useHttpService"
import { EdFiMetadata } from "../useEdfiUrls.types"

interface UseOdsInstanceDescriptionProps {
    instance: ODSInstance | null
}

const useOdsInstanceDescription = ({ instance }: UseOdsInstanceDescriptionProps) => {
    const { getSimpleAsync } = useHttpService()
    const [instanceOdsMetadata, setInstanceOdsMetadata] = useState<EdFiMetadata | null>(null)
    const [ loadingInstanceOdsMetadata, setLoadingInstanceOdsMetadata ] = useState(false)

    const getInstanceEdFiMetadata = async () => {
        if (!instance)
            return 

        if (!instance.baseUrl)
            return 

        setLoadingInstanceOdsMetadata(true)
        const getEdfiMetadataResult = await getSimpleAsync<EdFiMetadata>({
            actionName: "Get Instance Metadata",
            url: getInstanceBaseUrl()
        })

        setLoadingInstanceOdsMetadata(false)

        if (getEdfiMetadataResult.type === 'Error')
            return 

        setInstanceOdsMetadata(getEdfiMetadataResult.data)
    }

    const getInstanceBaseUrl = () => {
        if (!instance)
            return ""

        return instance.baseUrl
    }

    useEffect(() => {
        if (!instance)
            return 

        getInstanceEdFiMetadata()
    }, [ instance ])

    return {
        getInstanceBaseUrl,
        instanceOdsMetadata,
        loadingInstanceOdsMetadata
    }
}

export default useOdsInstanceDescription