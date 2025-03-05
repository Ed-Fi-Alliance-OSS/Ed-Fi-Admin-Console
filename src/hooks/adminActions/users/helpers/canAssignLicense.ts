// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

export const canAssignLicense = (assignedLicenses: number, totalLicenses: number) => {
  console.log('can assign licenses', assignedLicenses, totalLicenses)
  if (assignedLicenses < totalLicenses) {
    return true
  }

  if (totalLicenses === -1) {
    return true
  }

  return false
}