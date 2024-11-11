import { useEffect, useState } from 'react'
import useValidateSetAsDefault from './useValidateSetAsDefault'
import { ODSInstance } from '../../core/ODSInstance.types'

interface UseOdsInstancePageContentProps {
    instance: ODSInstance | null
}

const useOdsInstancePageContent = ({ instance }: UseOdsInstancePageContentProps) => {
  const [availableSetDefault, setAvailableSetDefault] = useState(false)

  const {
    canSetAsDefaultAsync
  } = useValidateSetAsDefault()

  const checkIfCanSetAsDefault = async () => {
    if (!instance)
      return 

    const result = await canSetAsDefaultAsync(instance)

    setAvailableSetDefault(result)
  }

  useEffect(() => {
    if (!instance)
      return 

    checkIfCanSetAsDefault()
  }, [ instance ])

  return {
    availableSetDefault
  }
}

export default useOdsInstancePageContent