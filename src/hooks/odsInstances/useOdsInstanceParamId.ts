import { useLocation } from 'react-router-dom'

const useOdsInstanceParamId = () => {
  const location = useLocation()

  const getInstanceIdFromPathName = () => {
    const pathnameSplits = location.pathname.split('/')

    if (pathnameSplits.length > 1) {
      return pathnameSplits[2]
    }

    return 'unknown'
  }

  return { getInstanceIdFromPathName }
}

export default useOdsInstanceParamId