import { InstanceEdfiStatus, InstanceOperationStatus, ODSInstance } from '../../core/ODSInstance.types'
import { EdFiMetadata } from '../useEdfiUrls.types'

interface UseOdsInstanceEdFiStatusProps {
  instance: ODSInstance | null
  edFiMetadata: EdFiMetadata | null
}

const useOdsInstanceEdFiStatus = ({ edFiMetadata }: UseOdsInstanceEdFiStatusProps) => {
  const getOperationStatus = (): InstanceOperationStatus => {
    if (!edFiMetadata)
      return 'Offline'

    return 'Operational'
  }

  const getOdsInstanceEdFiStatus = (): InstanceEdfiStatus => {
    return {
      operationStatus: getOperationStatus()
    }
  }



  const getOdsInstanceEdFiStatusFromMetadata = (edFiMetadata: EdFiMetadata | null): InstanceEdfiStatus => {
    if (!edFiMetadata)
      return {
        operationStatus: 'Offline'
      }

    return { operationStatus: 'Operational' }
  }

  return {
    getOdsInstanceEdFiStatus,
    getOdsInstanceEdFiStatusFromMetadata
  }
}

export default useOdsInstanceEdFiStatus