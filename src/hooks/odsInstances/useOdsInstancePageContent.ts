// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  useEffect, useState 
} from 'react'
import useValidateSetAsDefault from './useValidateSetAsDefault'
import { ODSInstance } from '../../core/ODSInstance.types'

interface UseOdsInstancePageContentProps {
    instance: ODSInstance | null
}

const useOdsInstancePageContent = ({ instance }: UseOdsInstancePageContentProps) => {
  const [ availableSetDefault, setAvailableSetDefault ] = useState(false)

  const {
    canSetAsDefaultAsync
  } = useValidateSetAsDefault()

  const checkIfCanSetAsDefault = async () => {
    if (!instance) {
      return
    } 

    const result = await canSetAsDefaultAsync(instance)

    setAvailableSetDefault(result)
  }

  useEffect(() => {
    if (!instance) {
      return
    } 

    checkIfCanSetAsDefault()
  }, [ instance ])

  return { availableSetDefault }
}

export default useOdsInstancePageContent