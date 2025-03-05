// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

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