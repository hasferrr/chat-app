const epochToDate = (epochTime: number): string => {
  const localDate = new Date(epochTime)

  const monthArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  const year = localDate.getFullYear()
  const month = monthArray[localDate.getMonth()]
  const day = localDate.getDate()
  const hours = localDate.getHours()
  const minutes = localDate.getMinutes()

  let formattedHours = hours % 12
  if (formattedHours === 0) {
    formattedHours = 12 // 12:00 AM or 12:00 PM
  }
  const amOrPm = hours < 12 ? 'AM' : 'PM'

  const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`
  const formattedDate = `${day} ${month} ${year}`

  return `${formattedDate}, ${formattedTime}`
}

export default epochToDate
