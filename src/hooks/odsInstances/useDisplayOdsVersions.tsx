import { EdFiMetadata } from '../useEdfiUrls.types'
import useOdsVersions from './useOdsVersions'

interface UseDisplayOdsVersionsProps {
    instanceOdsMetadata: EdFiMetadata | null
}

const useDisplayOdsVersions = ({ instanceOdsMetadata }: UseDisplayOdsVersionsProps) => {
  const {
    getEdFiVersionFromMetadata,
    getTSDSVersionFromMetadata
  } = useOdsVersions()

  const displayEdFiVersionContent = () => {
    return getEdFiVersionFromMetadata(instanceOdsMetadata)
  }

  const displayTsdsVersionContent = () => {
    return getTSDSVersionFromMetadata(instanceOdsMetadata)
    // return <Flex gridGap={2}>
    //   {instanceOdsMetadata?.dataModels?.map(dataModel => {
    //     return <>
    //       <Tag>{dataModel.name} ({dataModel.version})</Tag>
    //     </>
    //   })}
    // </Flex>
  }

  return {
    displayEdFiVersionContent,
    displayTsdsVersionContent
  }
}

export default useDisplayOdsVersions