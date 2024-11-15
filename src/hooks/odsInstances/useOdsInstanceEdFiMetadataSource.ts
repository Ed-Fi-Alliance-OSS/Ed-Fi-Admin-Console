import useExternalODSData from '../useExternalODSData'

export type InstanceEdFiMetadataSource = 'Starting Blocks' | 'Instance BaseUrl'

const useOdsInstanceEdFiMetadataSource = () => {
  const { externalODS } = useExternalODSData()

  const getEdFiMetadataSource = (): InstanceEdFiMetadataSource => {
    if (externalODS.isExternalODS)
      return 'Instance BaseUrl'

    return 'Starting Blocks'
  }

  return {
    getEdFiMetadataSource
  }
}

export default useOdsInstanceEdFiMetadataSource