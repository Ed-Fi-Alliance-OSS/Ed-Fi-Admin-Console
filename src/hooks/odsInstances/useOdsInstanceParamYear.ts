import { useLocation } from 'react-router-dom'

const useOdsInstanceParamYear = () => {
  const location = useLocation()

  const getInstanceYearFromPathName = () => {
    const pathnameSplits = location.pathname.split('/')
    if (pathnameSplits.length > 1)
      return pathnameSplits[2]

    return 'unknown'
  }

  return {
    getInstanceYearFromPathName
  }
}

export default useOdsInstanceParamYear