const commonPhraseStart = (fieldName: string) => `${fieldName}`

export default class ErrorMessagesGenerator {
  static emptyField(fieldName: string) {
    return `${commonPhraseStart(fieldName)} should not be empty.`
  }

  static moreThan(fieldName: string, count: number, charType: string) {
    return `${commonPhraseStart(fieldName)} should have at least ${count} ${charType}.`
  }

  static lessThan(fieldName: string, count: number, charType: string) {
    return `${commonPhraseStart(fieldName)} should have less than ${count} ${charType}.`
  }

  static onlyLetters(fieldName: string) {
    return `${commonPhraseStart(fieldName)} should only have letters.`
  }

  static onlyNumbers(fieldName: string) {
    return `${commonPhraseStart(fieldName)} should only have digits.`
  }

  static invalidEmail() {
    return 'Wrong Email format.'
  }
}