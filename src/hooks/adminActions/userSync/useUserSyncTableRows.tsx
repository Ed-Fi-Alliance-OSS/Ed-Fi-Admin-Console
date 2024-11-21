const useUserSyncTableRows = () => {
  const getFormatedDate = (date: string) => {
    function formatDate(dateVal: string) {
      const newDate = new Date(dateVal)
      const sMonth = padValue(newDate.getMonth() + 1)
      const sDay = padValue(newDate.getDate())
      const sYear = newDate.getFullYear()
      let sHour: any = newDate.getHours()
      const sMinute = padValue(newDate.getMinutes())
      const sSeconds = padValue(newDate.getSeconds())
      let sAMPM = 'AM'
      const iHourCheck = parseInt(sHour)

      if (iHourCheck > 12) {
        sAMPM = 'PM'
        sHour = iHourCheck - 12
      } else if (iHourCheck === 0) {
        sHour = '12'
      }

      sHour = padValue(sHour)

      return sMonth + '/' + sDay + '/' + sYear + ' ' + sHour + ':' + sMinute + ':' + sSeconds + ' ' + sAMPM
    }

    function padValue(value: any) {
      return (value < 10) ? '0' + value : value
    }

    return formatDate(date)
  }

  const getDuration = (start: string, end: string) => {
    const a = new Date(start) as any
    const b = new Date(end) as any

    return (b - a) / 1000
  }

  return {
    getFormatedDate,
    getDuration
  }
}

export default useUserSyncTableRows