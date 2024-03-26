export const formatDate = (date: string) => {
  const parsedDate = new Date(date)

  const day = String(parsedDate.getDate()).padStart(2, '0')
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const year = parsedDate.getFullYear()

  return `${day}.${month}.${year}`
}
