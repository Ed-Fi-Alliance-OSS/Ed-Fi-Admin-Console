// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

const endpointsPrefix = 'tenants'
const dataHealthEndpointPrefix = 'datahealthchecksedfi'

const tenantActionRoutes = {
  getTenant: (tenantId: string) => `${endpointsPrefix}/${tenantId}`,
  putTenant: (tenantId: string) => `${endpointsPrefix}/${tenantId}`,
  getApplicationsList: (tenantId: string) => `${endpointsPrefix}/${tenantId}/subscriptions/applications`,
  getUsersList: (tenantId: string) => `${endpointsPrefix}/${tenantId}/users`,
  getUserById: (tenantId: string, userId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}`,
  deleteUserById: (tenantId: string, userId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}`,
  deleteInvitationById: (tenantId: string, invitationId: string) => `${endpointsPrefix}/${tenantId}/invitations/${invitationId}`,
  getOrganizations: (tenantId: string) => `${endpointsPrefix}/${tenantId}/organizations`,
  getStaffClassifications: (tenantId: string) => `${endpointsPrefix}/${tenantId}/staffclassifications`,
  getEducationOrganizations: (tenantId: string, userId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}/educationorganizations`,
  createEducationOrganization: (tenantId: string, userId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}/educationorganizations`,
  updateEducationOrganization: (tenantId: string, userId: string, educationOrganizationId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}/educationorganizations/${educationOrganizationId}`,
  deleteEducationOrganization: (tenantId: string, userId: string, educationOrganizationId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}/educationorganizations/${educationOrganizationId}`,
  postDomain: (tenantId: string) => `${endpointsPrefix}/${tenantId}/domains`,
  verifyDomain: (tenantId: string, domainName: string) => `${endpointsPrefix}/${tenantId}/domains/${domainName}/verify`,
  deleteDomain: (tenantId: string, domainName: string) => `${endpointsPrefix}/${tenantId}/domains/${domainName}`,
  postUser: (tenantId: string) => `${endpointsPrefix}/${tenantId}/users`,
  activateUser: (tenantId: string, userId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}/activate`,
  deactivateUser: (tenantId: string, userId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}/deactivate`,
  checkUserEmail: (tenantId: string, email: string) => `${endpointsPrefix}/${tenantId}/users/${email}/status`,
  postSendInvitation: (tenantId: string) => `${endpointsPrefix}/${tenantId}/invitations`,
  getInvitationsList: (tenantId: string) => `${endpointsPrefix}/${tenantId}/invitations`,
  putUser: (tenantId: string, userId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}`,
  putRevokeLicense: (tenantId: string, userId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}/licenses/revoke`,
  putAssignLicense: (tenantId: string, userId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}/licenses/assign`,
  putRevokeBulkUserLicenses: (tenantId: string, userId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}/licenses/revokebulk`,
  putAssignBulkUserLicenses: (tenantId: string, userId: string) => `${endpointsPrefix}/${tenantId}/users/${userId}/licenses/assignbulk`,
  getSubscriptionsList: (tenantId: string) => `${endpointsPrefix}/${tenantId}/subscriptions`,
  postCreateSubscription: (tenantId: string) => `${endpointsPrefix}/${tenantId}/subscriptions`,
  putUpdateSubscription: (tenantId: string, subscriptionId: string) => `${endpointsPrefix}/${tenantId}/subscriptions/${subscriptionId}`,
  createConnection: (tenantId: string) => `${endpointsPrefix}/${tenantId}/datasync/connections/create`,
  getHealthCheckDistrictDetails: (tenantId: string) => `${endpointsPrefix}/${tenantId}/${dataHealthEndpointPrefix}/odshealthcheckdistrictdetails`,
  getOdsInstanceHealthCheckDistrictDetails: (tenantId: string, year: number) => `${endpointsPrefix}/${tenantId}/${dataHealthEndpointPrefix}/${year}/odshealthcheckdistrictdetails`,
  getInvitationById: (tenantId: string, invitationId: string) => `${endpointsPrefix}/${tenantId}/invitations/${invitationId}`
}

export default tenantActionRoutes