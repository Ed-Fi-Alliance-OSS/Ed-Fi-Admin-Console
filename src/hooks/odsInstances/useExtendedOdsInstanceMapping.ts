import { ExtendedODSInstance, ODSInstance } from "../../core/ODSInstance.types"
import useHttpService from "../http/useHttpService"
import { EdFiMetadata } from "../useEdfiUrls.types"
import useOdsInstanceEdFiStatus from "./useOdsInstanceEdFiStatus"
import useOdsVersions from "./useOdsVersions"

const useExtendedOdsInstanceMapping = () => {
    const { getSimpleAsync } = useHttpService()
    const {
        getEdFiVersionFromMetadata,
        getTSDSVersionFromMetadata
    } = useOdsVersions()

    const { getOdsInstanceEdFiStatusFromInstance } = useOdsInstanceEdFiStatus({
        instance: null,
        edFiMetadata: null
    })

    const getInstanceEdFiMetadata = async (instance: ODSInstance) => {
        if (!instance.baseUrl)
            return null

        const getEdfiMetadataResult = await getSimpleAsync<EdFiMetadata>({
            actionName: "Get Instance Metadata",
            url: instance.baseUrl ?? ""
        })

        if (getEdfiMetadataResult.type === 'Error')
            return null

        return getEdfiMetadataResult.data
    }

    const mapToExtendedOdsInstance = async (instance: ODSInstance): Promise<ExtendedODSInstance> => {
        const edFiMetadata = await getInstanceEdFiMetadata(instance)

        return {
            instanceId: instance.instanceId,
            tenantId: instance.tenantId,
            instanceName: instance.instanceName,
            instanceType: instance.instanceType,
            connectionType: instance.connectionType,
            baseUrl: instance.baseUrl,
            resourcesUrl: instance.resourcesUrl,
            authenticationUrl: instance.authenticationUrl,
            clientId: instance.clientId,
            clientSecret: instance.clientSecret,
            isDefault: instance.isDefault,
            edFiVersion: getEdFiVersionFromMetadata(edFiMetadata),
            tsdsVersion: getTSDSVersionFromMetadata(edFiMetadata),
            edFiStatus: getOdsInstanceEdFiStatusFromInstance(instance, edFiMetadata),
            schoolYears: instance.schoolYears.map(sy => sy),
            verificationStatus: instance.verificationStatus,
            provider: instance.provider
        }
    }

    return {
        mapToExtendedOdsInstance
    }
}

export default useExtendedOdsInstanceMapping