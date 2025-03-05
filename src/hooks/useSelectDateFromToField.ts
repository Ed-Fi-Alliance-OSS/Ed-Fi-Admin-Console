// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useState } from 'react'

const useSelectDateFromToField = () => {
  const [ startDate, setStartDate ] = useState<Date | null>(null)
  const [ endDate, setEndDate ] = useState<Date | null>(null)

  const handleUpdateStartDate = (date: Date) => {
    setStartDate(date)

    return null
  }

  const handleUpdateEndDate = (date: Date) => {
    setEndDate(date)

    return null
  }

  return {
    startDate,
    endDate,
    handleUpdateStartDate,
    handleUpdateEndDate
  }
}

export default useSelectDateFromToField