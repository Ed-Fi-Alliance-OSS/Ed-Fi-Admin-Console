import { ExtendedODSInstance, ODSInstance } from "../../core/ODSInstance.types"

const useOdsInstanceHostingType = () => {
    const getHostingType = (instance: ExtendedODSInstance | ODSInstance | null) => {
        if (!instance)
            return "Unknown"

        if (instance.provider == "TexasEducationExchange")
            return "Exchange"

        if (instance.provider == "External")
            return "External"

        return "EdGraph"
    }

    return {
        getHostingType
    }
}

export default useOdsInstanceHostingType