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