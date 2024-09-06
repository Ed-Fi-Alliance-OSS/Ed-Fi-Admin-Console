import { AppUserProfile } from "../../../core/AppUser.types"
import { Invitation } from "../../../core/invitations/Invitation.types"
import { UserEducationOrganization } from "../../../core/userEducationOrganizations/UserEducationOrganizations.types"
import { HttpServiceRequestError, HttpServiceResponse } from "../../HttpService/HttpService.response.types"
import { AppUserListData } from "./UsersResponseMapper.types"
import { AddUserResponse, AssignBulkLicensesResponse, ActivateUserResponse, DeactivateUserResponse, AssignLicenseResponse, CheckUserEmailResponse, CreateUserEducationOrganizationsResponse, DeleteUserEducationOrganizationResponse, DeleteUserResponse, EditUserResponse, GetOrganizationsResponse, GetStaffClassificationsResponse, InviteUserResponse, RevokeBulkLicensesResponse, RevokeLicenseResponse, UpdateUserEducationOrganizationResponse } from "./UsersService.responses"

export type GetUsersListResult = Promise<HttpServiceResponse<AppUserListData> | HttpServiceRequestError>
export type GetUserProfileResult = Promise<HttpServiceResponse<AppUserProfile> | HttpServiceRequestError>
export type AddUserResult = Promise<HttpServiceResponse<AddUserResponse> | HttpServiceRequestError>
export type EditUserResult = Promise<HttpServiceResponse<EditUserResponse> | HttpServiceRequestError>
export type InviteUserResult = Promise<HttpServiceResponse<InviteUserResponse> | HttpServiceRequestError>
export type ActivateUserResult = Promise<HttpServiceResponse<ActivateUserResponse> | HttpServiceRequestError>
export type DeactivateUserResult = Promise<HttpServiceResponse<DeactivateUserResponse> | HttpServiceRequestError>
export type DeleteUserResult = Promise<HttpServiceResponse<DeleteUserResponse> | HttpServiceRequestError>
export type DeleteInvitationResult = Promise<HttpServiceResponse<void> | HttpServiceRequestError>
export type GetInvitationsListResult = Promise<HttpServiceResponse<Invitation[]> | HttpServiceRequestError>
export type GetInvitationByIdResult = Promise<HttpServiceResponse<Invitation> | HttpServiceRequestError>
export type CheckUserEmailResult = Promise<HttpServiceResponse<CheckUserEmailResponse> | HttpServiceRequestError>
export type AssignLicenseResult = Promise<HttpServiceResponse<AssignLicenseResponse> | HttpServiceRequestError>
export type RevokeLicenseResult = Promise<HttpServiceResponse<RevokeLicenseResponse> | HttpServiceRequestError>
export type AssignBulkLicensesResult = Promise<HttpServiceResponse<AssignBulkLicensesResponse> | HttpServiceRequestError>
export type RevokeBulkLicensesResult = Promise<HttpServiceResponse<RevokeBulkLicensesResponse> | HttpServiceRequestError>

export type GetOrganizationsResult = Promise<HttpServiceResponse<GetOrganizationsResponse> | HttpServiceRequestError>
export type GetStaffClassificationsResult = Promise<HttpServiceResponse<GetStaffClassificationsResponse> | HttpServiceRequestError>

export type GetUserEducationOrganizationsResult = Promise<HttpServiceResponse<UserEducationOrganization> | HttpServiceRequestError>
export type CreateUserEducationOrganizationResult = Promise<HttpServiceResponse<CreateUserEducationOrganizationsResponse> | HttpServiceRequestError>
export type UpdateUserEducationOrganizationResult = Promise<HttpServiceResponse<UpdateUserEducationOrganizationResponse> | HttpServiceRequestError>
export type DeleteUserEducationOrganizationResult = Promise<HttpServiceResponse<DeleteUserEducationOrganizationResponse> | HttpServiceRequestError>