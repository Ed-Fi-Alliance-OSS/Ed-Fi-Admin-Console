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
    return instance.edfiMetadata
  }

  const mapToExtendedOdsInstance = async (instance: ODSInstance): Promise<ExtendedODSInstance> => {
    const edFiMetadata = await getInstanceEdFiMetadata(instance)

    return {
      instanceId: instance.instanceId,
      tenantId: instance.tenantId,
      instanceName: instance.instanceName,
      instanceType: instance.instanceType,
      connectionType: instance.connectionType,
      edfiMetadata: instance.edfiMetadata,
      resourcesUrl: instance.resourcesUrl,
      authenticationUrl: instance.authenticationUrl,
      clientId: instance.clientId,
      clientSecret: instance.clientSecret,
      isDefault: instance.isDefault,
      edFiVersion: getEdFiVersionFromMetadata(edFiMetadata),
      tsdsVersion: getTSDSVersionFromMetadata(edFiMetadata),
      edFiStatus: getOdsInstanceEdFiStatusFromMetadata(edFiMetadata),
      schoolYears: instance.schoolYears.map(sy => sy),
      verificationStatus: instance.verificationStatus,
      provider: instance.provider
    }
  }

  return { mapToExtendedOdsInstance }
}

export default useExtendedOdsInstanceMapping