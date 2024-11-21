import { ODSInstance } from '../../core/ODSInstance.types'
import routes from '../../core/routes'
import useOdsInstanceYear from './useOdsInstanceYear'

const useOdsInstanceLink = () => {
  const { getInstanceYear } = useOdsInstanceYear()

  const getOdsInstanceLink = (instance: ODSInstance): string => {
    const year = getInstanceYear(instance)

    return routes.instance.url.replace(':year', year? year.toString() : '0')
  }

  return { getOdsInstanceLink }
}

export default useOdsInstanceLink