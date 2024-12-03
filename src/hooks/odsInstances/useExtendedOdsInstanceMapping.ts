import {
  ExtendedODSInstance, ODSInstance
} from '../../core/ODSInstance.types'
import useHttpService from '../http/useHttpService'
import useOdsInstanceEdFiStatus from './useOdsInstanceEdFiStatus'
import useOdsVersions from './useOdsVersions'

const useExtendedOdsInstanceMapping = () => {
  const { getSimpleAsync } = useHttpService()

  const {
    getEdFiVersionFromMetadata,
    getTSDSVersionFromMetadata
  } = useOdsVersions()

  const { getOdsInstanceEdFiStatusFromMetadata } = useOdsInstanceEdFiStatus({
    instance: null,
    edFiMetadata: null
  })

  const getInstanceEdFiMetadata = (instance: ODSInstance) => {
    // return instance.edfiMetadata
    return null
  }

  const mapToExtendedOdsInstance = async (instance: ODSInstance): Promise<ExtendedODSInstance> => {
    const edFiMetadata = await getInstanceEdFiMetadata(instance)

    return {
      name: instance.name,
      odsInstanceId: instance.odsInstanceId,
      instanceType: instance.instanceType,
      edFiVersion: getEdFiVersionFromMetadata(edFiMetadata),
      tsdsVersion: getTSDSVersionFromMetadata(edFiMetadata),
      edFiStatus: getOdsInstanceEdFiStatusFromMetadata(edFiMetadata)
    }
  }

  return { mapToExtendedOdsInstance }
}

export default useExtendedOdsInstanceMapping