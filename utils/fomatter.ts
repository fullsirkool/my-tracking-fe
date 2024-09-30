export enum FomatterType {
  CAPITALIZED = 'CAPITALIZED',
}
export const formatter = (text: string, type: FomatterType) => {
  if (type === FomatterType.CAPITALIZED) {
    const words = text.split(' ')
    const capitalizedWords = words.map(
      (word) => word[0].toUpperCase() + word.slice(1).toLowerCase(),
    )
    return capitalizedWords.join(' ')
  }

  console.warn('No Formatter for this type yet!')
  return ''
}
