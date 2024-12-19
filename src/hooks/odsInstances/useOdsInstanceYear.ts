import { ODSInstance } from '../../core/ODSInstance.types'

const useOdsInstanceYear = () => {
  const getInstanceYear = (instance: ODSInstance | null | undefined) => {
    if (!instance) {
      return null
    }

    console.log(instance)

    return instance.document?.odsInstanceContexts?.find(context => context.contextKey === 'schoolYearFromRoute')?.contextValue ?? new Date().getFullYear()
  }

  return { getInstanceYear }
}

export default useOdsInstanceYear