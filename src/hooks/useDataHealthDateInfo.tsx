import { useState } from 'react'

const generateDataHealthDate = () => {
  const currentDate = new Date()
  const month = currentDate.toLocaleString('en-us', { month: 'long' })
  const day = currentDate.getDate()
  const year = currentDate.getFullYear()

  const hours = currentDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true 
  })

  return `Last updated ${month} ${day}, ${year} at ${hours}`
}

const useDataHealthDateInfo = () => {
  const [ dataHealthDate, setDataHealthDate ] = useState<string>(() => generateDataHealthDate())
  const onUpdateDataHealthDate = () => setDataHealthDate(generateDataHealthDate())

  return {
    dataHealthDate,
    onUpdateDataHealthDate
  }
}

export default useDataHealthDateInfo