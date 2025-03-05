// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { CreateEdfiApplicationRequest } from '../../../services/AdminActions/Edfi/Applications/EdfiApplicationService.requests'

const claimSetOptions = [
  'Select Option',
  'AB Connect',
  'Assessment Read',
  'Assessment Vendor',
  'District Hosted SIS Vendor',
  'Ed-Fi API Publisher - Reader'
]

const initialApplicationData: CreateEdfiApplicationRequest = {
  vendorId: 0,
  applicationName: '',
  claimSetName: claimSetOptions[0],
  educationOrganizationIds: []
}

export {
  claimSetOptions,
  initialApplicationData
}