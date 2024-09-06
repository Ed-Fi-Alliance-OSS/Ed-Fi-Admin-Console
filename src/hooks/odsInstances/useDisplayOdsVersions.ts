import { EdFiMetadata } from "../useEdfiUrls.types"
import useOdsVersions from "./useOdsVersions"

interface UseDisplayOdsVersionsProps {
    instanceOdsMetadata: EdFiMetadata | null
}

const useDisplayOdsVersions = ({ instanceOdsMetadata }: UseDisplayOdsVersionsProps) => {
    const {
        getEdFiVersionFromMetadata,
        getTSDSVersionFromMetadata
    } = useOdsVersions()

    const displayEdFiVersionContent = () => {
        return getEdFiVersionFromMetadata(selectMetadata())
    }

    const displayTsdsVersionContent = () => {
        return getTSDSVersionFromMetadata(selectMetadata())
    }

    const selectMetadata = () => {
        return instanceOdsMetadata
    }

    return {
        displayEdFiVersionContent,
        displayTsdsVersionContent
    }
}

export default useDisplayOdsVersions