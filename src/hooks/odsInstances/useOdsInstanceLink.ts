import { ODSInstance } from '../../core/ODSInstance.types'
import routes from '../../core/routes'

const useOdsInstanceLink = () => {

  const getOdsInstanceLink = (instance: ODSInstance): string => {
    return routes.instance.url.replace(':odsInstanceId', instance.odsInstanceId ? instance.odsInstanceId.toString() : '0')
  }

  return { getOdsInstanceLink }
}

export default useOdsInstanceLink