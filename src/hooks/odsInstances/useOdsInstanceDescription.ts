import {
  useEffect, useState 
} from 'react'
import { ODSInstance } from '../../core/ODSInstance.types'
import useHttpService from '../http/useHttpService'
import { EdFiMetadata } from '../useEdfiUrls.types'

interface UseOdsInstanceDescriptionProps {
    instance: ODSInstance | null
}

const useOdsInstanceDescription = ({ instance }: UseOdsInstanceDescriptionProps) => {
  const { getSimpleAsync } = useHttpService()
  const [instanceOdsMetadata, setInstanceOdsMetadata] = useState<EdFiMetadata | null>(null)
  const [ loadingInstanceOdsMetadata, setLoadingInstanceOdsMetadata ] = useState(false)

  const getInstanceEdFiMetadata = async () => {
    if (!instance) {
      return
    } 

    if (!instance.edfiMetadata) {
      return
    } 

    setInstanceOdsMetadata(instance.edfiMetadata)
  }

  useEffect(() => {
    if (!instance) {
      return
    } 

    getInstanceEdFiMetadata()
  }, [ instance ])

  return {
    instanceOdsMetadata,
    loadingInstanceOdsMetadata
  }
}

export default useOdsInstanceDescription