import {
  useContext, useEffect, useState 
} from 'react'
import { HttpServiceGetRequest } from '../../services/HttpService/HttpService.types'
import useHttpService from '../http/useHttpService'
import { EdFiMetadata } from '../useEdfiUrls.types'
import { adminConsoleContext } from '../../context/adminConsoleContext'
import useOdsInstanceEdFiMetadataSource from './useOdsInstanceEdFiMetadataSource'

interface UseStartingBlocksEdFiMetadataProps {
    fetch: boolean
}

const useStartingBlocksEdFiMetadata = ({ fetch }: UseStartingBlocksEdFiMetadataProps) => {
  const { getEdFiMetadataSource } = useOdsInstanceEdFiMetadataSource()
  const adminConfig = useContext(adminConsoleContext)
  const { getSimpleAsync } = useHttpService()
  const [ startingBlocksMetadata, setStartingBlocksMetadata ] = useState<EdFiMetadata | null>(null)
  const [ loadingStartingBlocksMetadata, setLoadingStartingBlocksMetadata ] = useState(false)

  const fetchStartingBlocksMetadata = async (): Promise<EdFiMetadata | null> => {
    if (!adminConfig) {
      return null
    }

    if (getEdFiMetadataSource() === 'Instance BaseUrl') {
      return null
    }

    const odsStartingBlocksUrl = ''

    const request: HttpServiceGetRequest = {
      actionName: 'Get Starting Blocks Metadata',
      url: odsStartingBlocksUrl
    }

    const result = await getSimpleAsync<EdFiMetadata>(request)

    if (result.type === 'Error') {
      return null
    }

    return result.data
  }

  const fetchAndSetStartingBlocksMetadata = async () => {
    setLoadingStartingBlocksMetadata(true)

    const result = await fetchStartingBlocksMetadata()

    setLoadingStartingBlocksMetadata(false)
    setStartingBlocksMetadata(result)
  }

  useEffect(() => {
    if (!fetch) {
      return
    } 

    fetchAndSetStartingBlocksMetadata()
  }, [ fetch ])

  return {
    startingBlocksMetadata,
    setStartingBlocksMetadata,
    fetchStartingBlocksMetadata,
    loadingStartingBlocksMetadata
  }
}

export default useStartingBlocksEdFiMetadata