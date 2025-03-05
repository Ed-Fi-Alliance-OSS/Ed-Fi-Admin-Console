// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

const edfiPrefix = (tenantId: string) =>  `tenants/${tenantId}/edfiadmin`

const edfiActionRoutes = {
  getVersion: (tenantId: string) => edfiPrefix(tenantId),
  getApplicationsList: (tenantId: string) => `${edfiPrefix(tenantId)}/applications`,
  getVendorsList: (tenantId: string) => `${edfiPrefix(tenantId)}/vendors`,
  deleteVendorById: (tenantId: string, vendorId: string) => `${edfiPrefix(tenantId)}/vendors/${vendorId}`,
  getVendorApplicationsList: (tenantId: string, vendorId: string) => `${edfiPrefix(tenantId)}/vendors/${vendorId}/applications`,
  getClaimsetsList: (tenantId: string) => `${edfiPrefix(tenantId)}/claimsets`,
  createApplication: (tenantId: string) => `${edfiPrefix(tenantId)}/applications`,
  deleteApplicationById: (tenantId: string, applicationId: string) => `${edfiPrefix(tenantId)}/applications/${applicationId}`,
  updateApplication: (tenantId: string, applicationId: string) => `${edfiPrefix(tenantId)}/applications/${applicationId}`,
  createVendor: (tenantId: string) => `${edfiPrefix(tenantId)}/vendors`,
  resetApplicationCredentials: (tenantId: string, applicationId: string) => `${edfiPrefix(tenantId)}/applications/${applicationId}/reset-credential`,
  createConnection: (tenantId: string) => `${edfiPrefix(tenantId)}/connections`,
  updateConnection: (tenantId: string, connectionId: string) => `${edfiPrefix(tenantId)}/connections/${connectionId}`,
  getAllConnections: (tenantId: string) => `${edfiPrefix(tenantId)}/connections`,
  createInstance: (tenantId: string) => `${edfiPrefix(tenantId)}/instances`,
  testConnection: (tenantId: string, instanceId: string) => `${edfiPrefix(tenantId)}/instances/${instanceId}/testconnection`,
  verifyConnection: (tenantId: string, connectionId: string) => `${edfiPrefix(tenantId)}/connections/${connectionId}/verify`,
  getClaimsetsListForSchoolyear: (tenantId: string, year: number) => `${edfiPrefix(tenantId)}/years/${year}/claimsets`,
  getApplicationsListForSchoolyear: (tenantId: string, year: number) => `${edfiPrefix(tenantId)}/years/${year}/applications`,
  updateApplicationForSchoolYear: (tenantId: string, applicationId: string, year: number) => `${edfiPrefix(tenantId)}/years/${year}/applications/${applicationId}`,
  deleteApplicationByIdForSchoolYear: (tenantId: string, applicationId: string, year: number) => `${edfiPrefix(tenantId)}/years/${year}/applications/${applicationId}`,
  createVendorForSchoolYear: (tenantId: string, year: number) => `${edfiPrefix(tenantId)}/years/${year}/vendors`,
  deleteVendorByIdForSchoolYear: (tenantId: string, vendorId: string, year: number) => `${edfiPrefix(tenantId)}/years/${year}/vendors/${vendorId}`,
  getVendorsListForSchoolYear: (tenantId: string, year: number) => `${edfiPrefix(tenantId)}/years/${year}/vendors`,
  getVendorApplicationsListForSchoolYear: (tenantId: string, vendorId: string, year: number) => `${edfiPrefix(tenantId)}/years/${year}/vendors/${vendorId}/applications`,
  createApplicationForSchoolYear: (tenantId: string, year: number) => `${edfiPrefix(tenantId)}/years/${year}/applications`,
  resetApplicationCredentialsForSchoolYear: (tenantId: string, applicationId: string, year: number) => `${edfiPrefix(tenantId)}/years/${year}/applications/${applicationId}/reset-credential`,
}

export default edfiActionRoutes