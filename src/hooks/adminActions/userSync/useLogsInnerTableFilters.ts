// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  ChangeEvent, useState 
} from 'react'
import {
  LogFilterTypeOption, LogFilterValues 
} from '../../../components/common/UserSync/LogsInnerTable.types'

const useLogsInnerTableFilters = () => {
  const [ logFilterValues, setLogFilterValues ] = useState<LogFilterValues>({
    messageText: '',
    messageType: 'Any'
  })

  const [ options, setOptions ] = useState<LogFilterTypeOption[]>([
    {
      text: 'Any',
      value: 'Any' 
    },
    {
      text: 'Information',
      value: 'Information' 
    },
    {
      text: 'Warning',
      value: 'Warning' 
    },
    {
      text: 'Sync Error',
      value: 'Sync Error' 
    },
    {
      text: 'Fatal Error',
      value: 'Fatal Error' 
    }
  ])

  const onChangeFilterOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const nlogFilterValues = { ...logFilterValues }
        
    nlogFilterValues.messageType = e.target.value as any

    setLogFilterValues(nlogFilterValues)
  }
    
  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    const nlogFilterValues = { ...logFilterValues }
        
    nlogFilterValues.messageText = e.target.value
      
    setLogFilterValues(nlogFilterValues)
  }

  const onResetFilters = () => {
    setLogFilterValues({
      messageText: '',
      messageType: 'Any'
    })
  }

  return {
    logFilterValues,
    options,
    onChangeFilterOption,
    onChangeMessage,
    onResetFilters
  }
}

export default useLogsInnerTableFilters