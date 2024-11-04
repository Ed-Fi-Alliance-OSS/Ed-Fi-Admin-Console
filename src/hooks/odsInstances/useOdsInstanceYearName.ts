import { ODSInstance } from '../../core/ODSInstance.types'
import useOdsInstanceYear from './useOdsInstanceYear'

const useOdsInstanceDisplayYear = () => {
  const { getInstanceYear } = useOdsInstanceYear()

  const getDisplayYear = (instance: ODSInstance) => {
    const instanceYear = getInstanceYear(instance)

    if (!instanceYear)
      return 'Empty'

    return `${instanceYear - 1} - ${instanceYear}`
  }

  const getDisplayYearFromString = (year: string) => {
    const intYear = parseInt(year)

    return `${intYear - 1} - ${intYear}`
  }

  return {
    getDisplayYear,
    getDisplayYearFromString
  }
}

export default useOdsInstanceDisplayYear