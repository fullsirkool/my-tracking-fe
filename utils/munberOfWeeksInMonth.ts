export default (date: Date = new Date()): number => {
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  if (month < 1 || month > 12) {
    throw new Error('Invalid month')
  }

  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const lastDayOfMonth = new Date(year, month + 1, 0).getDay()

  const lastDateOfMonth = new Date(year, month + 1, 0).getDate()

  if (month === 1 && firstDayOfMonth === 0 && lastDayOfMonth === 6) {
    return 4
  }

  const startBonus = firstDayOfMonth === 0 ? 0 : firstDayOfMonth
  const endBonus = lastDayOfMonth === 6 ? 0 : 6 - lastDayOfMonth

  const totalCountDays = lastDateOfMonth + startBonus + endBonus

  const weeksInMonth = Math.ceil(totalCountDays / 7)

  return weeksInMonth
}
