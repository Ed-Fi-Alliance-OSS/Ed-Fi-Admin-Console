import { useParams } from 'react-router-dom'

const useOdsInstanceIdParam = () => {
  const params = useParams()

  const getInstanceIdFromPath = (): string => {
    return params?.odsInstanceId || '0'
  }

  return { getInstanceIdFromPath }
}

export default useOdsInstanceIdParam