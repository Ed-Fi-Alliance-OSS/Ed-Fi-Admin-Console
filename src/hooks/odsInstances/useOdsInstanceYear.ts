import { ODSInstance } from '../../core/ODSInstance.types'

const useOdsInstanceYear = () => {
  const getInstanceYear = (instance: ODSInstance) => {
    if (!instance)
      return null

    if (instance.schoolYears.length == 0)
      return null
        
    return instance.schoolYears[0]
  }

  return {
    getInstanceYear
  }
}

export default useOdsInstanceYear