// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return date.toISOString().split('T')[0]
}

export default formatDate