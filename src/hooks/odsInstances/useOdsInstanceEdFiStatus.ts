import { InstanceEdfiStatus, InstanceOnboardingStatus, InstanceOperationStatus, ODSInstance } from '../../core/ODSInstance.types'
import { EdFiMetadata } from '../useEdfiUrls.types'

interface UseOdsInstanceEdFiStatusProps {
    instance: ODSInstance | null
    edFiMetadata: EdFiMetadata | null
}

const useOdsInstanceEdFiStatus = ({ instance, edFiMetadata }: UseOdsInstanceEdFiStatusProps) => {
  const getOperationStatus = (): InstanceOperationStatus => {
    if (!edFiMetadata)
      return 'Outage'

    return 'Operational'
  } 

  const getOnboardingStatus = (): InstanceOnboardingStatus => {
    if (!instance)
      return 'Empty'

    if (!instance.verificationStatus)
      return 'Empty'

    if (instance.verificationStatus.status != 'Completed')
      return 'Empty'

    return 'Populated'
  }

  const getOdsInstanceEdFiStatus = (): InstanceEdfiStatus => {
    return {
      operationStatus: getOperationStatus(),
      onboardingStatus: getOnboardingStatus()
    }
  }

  const getOdsInstanceEdFiStatusFromInstance = (instance: ODSInstance, edFiMetadata: EdFiMetadata | null): InstanceEdfiStatus => {
    return {
      operationStatus: getOperationStatusFromMetadata(edFiMetadata),
      onboardingStatus: getOnboardingStatusFromInstance(instance)
    }
  }

  const getOnboardingStatusFromInstance = (odsInstance: ODSInstance) => {
    if (!odsInstance)
      return 'Empty'

    if (!odsInstance.verificationStatus)
      return 'Empty'

    if (odsInstance.verificationStatus.status != 'Completed')
      return 'Empty'

    return 'Populated'
  }

  const getOperationStatusFromMetadata = (edFiMetadata: EdFiMetadata | null): InstanceOperationStatus => {
    if (!edFiMetadata)
      return 'Outage'

    return 'Operational'
  } 

  return {
    getOdsInstanceEdFiStatus,
    getOnboardingStatusFromInstance,
    getOdsInstanceEdFiStatusFromInstance
  }
}

export default useOdsInstanceEdFiStatus