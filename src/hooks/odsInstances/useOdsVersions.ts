import { EdFiMetadata } from "../useEdfiUrls.types"

const useOdsVersions = () => {
    const getEdFiVersionFromMetadata = (metadata: EdFiMetadata| null): string => {
        if (!metadata)
            return "-"

        return `Suite ${metadata.suite} v${metadata.version}`
    }

    const getTSDSVersionFromMetadata = (metadata: EdFiMetadata | null): string => {
        if (!metadata)
            return "-"

        if (!metadata.dataModels)
            return "-"

        const txDataModel = metadata.dataModels
            .find(item => item.name == "TX")

        if (!txDataModel)
            return '-'

        return txDataModel.version
    }

    return {
        getEdFiVersionFromMetadata,
        getTSDSVersionFromMetadata
    }
}

export default useOdsVersions