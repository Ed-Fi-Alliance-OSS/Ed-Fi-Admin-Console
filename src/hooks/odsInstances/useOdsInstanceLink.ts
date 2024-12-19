import { ODSInstance } from '../../core/ODSInstance.types'
import routes from '../../core/routes'

const useOdsInstanceLink = () => {

  const getOdsInstanceLink = (instance: ODSInstance): string => {
    return routes.instance.url.replace(':odsInstanceId', instance.id ? instance.id.toString() : '0')
  }

  return { getOdsInstanceLink }
}

export default useOdsInstanceLink