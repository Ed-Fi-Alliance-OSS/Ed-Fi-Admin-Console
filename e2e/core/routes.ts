// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

// export const baseUrl = "https://apps.txedexchange.dev/adminconsole";
export const baseUrl = 'http://localhost:8598'

export const routes = {
  home: baseUrl,
  console: `${baseUrl}/console`,
  instance: `${baseUrl}/schoolyear/2024`,
  debug: `${baseUrl}/debug`
}