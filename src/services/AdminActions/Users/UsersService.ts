import { useConfig } from '@edfi/admin-console-shared-sdk'
import { AppUserProfile } from '../../../core/AppUser.types'
import { Invitation } from '../../../core/invitations/Invitation.types'
import { UserEducationOrganization } from '../../../core/userEducationOrganizations/UserEducationOrganizations.types'
import useHttpService from '../../../hooks/http/useHttpService'
import { HttpServiceResponse } from '../../HttpService/HttpService.response.types'
import { ActionParams } from '../adminAction.types'
import adminActionRoutes from '../tenantActionRoutes'
import {
  ActivateUserResult, AddUserResult, AssignBulkLicensesResult, AssignLicenseResult, CheckUserEmailResult, CreateUserEducationOrganizationResult, DeactivateUserResult, DeleteInvitationResult, DeleteUserEducationOrganizationResult, DeleteUserResult, EditUserResult, GetInvitationsListResult, GetOrganizationsResult, GetStaffClassificationsResult, GetUserEducationOrganizationsResult, GetUserProfileResult, GetUsersListResult, InviteUserResult, RevokeBulkLicensesResult, RevokeLicenseResult, UpdateUserEducationOrganizationResult 
} from './UserService.results'
import UsersResponseMapper from './UsersResponseMapper'
import { AppUserListData } from './UsersResponseMapper.types'
import {
  ActivateUserRequest, AddUserRequest, AssignBulkLicensesRequest, AssignLicenseRequest, CheckUserEmailRequest, CreateUserEducationOrganizationsRequest, DeactivateUserRequest, DeleteInvitationRequest, DeleteUserEducationOrganizationsRequest, DeleteUserRequest, GetInvitationsListRequest, GetOrganizationsRequest, GetStaffClassificationsRequest, GetUserEducationOrganizationsRequest, GetUserProfileByIdRequest, GetUsersListRequest, InviteUserRequest, RevokeBulkLicensesRequest, RevokeLicenseRequest, UpdateUserEducationOrganizationsRequest, UpdateUserRequest 
} from './UsersService.requests'
import {
  ActivateUserResponse, AddUserResponse, AssignBulkLicensesResponse, AssignLicenseResponse, CheckUserEmailResponse, CreateUserEducationOrganizationsResponse, DeactivateUserResponse, DeleteUserEducationOrganizationResponse, DeleteUserResponse, EditUserResponse, GetInvitationsListResponse, GetOrganizationsResponse, GetStaffClassificationsResponse, InviteUserResponse, RevokeBulkLicensesResponse, RevokeLicenseResponse, UpdateUserEducationOrganizationResponse 
} from './UsersService.responses'

const useUserService = () => {
  const { getAsync, postAsync, putAsync, deleteAsync } = useHttpService()
  const { config } = useConfig()

  const getUsersList = async (actionParams: ActionParams, requestData: GetUsersListRequest): GetUsersListResult => {
    const { pageIndex, pageSize, orderBy } = requestData
    const baseUrl = actionParams.edxApiUrl
    let queryParams = `pageIndex=${pageIndex}&pageSize=${pageSize}`
        
    if (requestData.filter) {
      queryParams = `${queryParams}&filter=${requestData.filter}`
    }

    if (orderBy) {
      queryParams = `${queryParams}&orderBy=${orderBy}`
    }

    // const url = `${baseUrl}/${adminActionRoutes.getUsersList(actionParams.tenantId)}?${queryParams}`
    const url = `${config.app.basePath}/mockdata/data-users.json`
    
    const result = await getAsync<AppUserListData>({ 
      actionName: 'Get Users List',
      access_token: actionParams.token,
      url,
      apiConfig: actionParams.config.api
    })

    console.log('result', result)
    
    // if (result.type === 'Response') {
    //   //UsersResponseMapper.mapToUsersList(result.data, actionParams.tenantId),
    //   // const mappedResult: HttpServiceResponse<AppUserListData> = {
    //   //   data: result.data ?? [],
    //   //   type: 'Response'
    //   // }
    
    //   return {
    //     data: result.data,
    //     type: 'Response'
    //   }
    // }
    
    return result
  }

  const getUserById = async (actionParams: ActionParams, request: GetUserProfileByIdRequest): GetUserProfileResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.getUserById(actionParams.tenantId, request.userId)}`
    
    const result = await getAsync<AppUserProfile>({
      url,
      access_token: actionParams.token,
      actionName: 'Get User By Id',
      apiConfig: actionParams.config.api
    })
    
    return result
  }
    
  const addUser = async (actionParams: ActionParams, data: AddUserRequest): AddUserResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.postUser(actionParams.tenantId)}`
    
    const result = await postAsync<AddUserResponse, AddUserRequest>({ 
      actionName: 'Add User',
      access_token: actionParams.token,
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const activateUser = async (actionParams: ActionParams, data: ActivateUserRequest): ActivateUserResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.activateUser(actionParams.tenantId, data.userId)}`
    
    const result = await putAsync<ActivateUserResponse, ActivateUserRequest>({ 
      actionName: 'Activate User',
      access_token: actionParams.token,
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const deactivateUser = async (actionParams: ActionParams, data: DeactivateUserRequest): DeactivateUserResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.deactivateUser(actionParams.tenantId, data.userId)}`
    
    const result = await putAsync<DeactivateUserResponse, DeactivateUserRequest>({ 
      actionName: 'Deactivate User',
      access_token: actionParams.token,
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const deleteUser = async (actionParams: ActionParams, data: DeleteUserRequest): DeleteUserResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.deleteUserById(actionParams.tenantId, data.userId)}`

    const result = await deleteAsync<DeleteUserResponse>({
      actionName: 'Delete User',
      access_token: actionParams.token,
      url,
      apiConfig: actionParams.config.api
    })

    return result
  }
    
  const updateUser = async (actionParams: ActionParams, data: UpdateUserRequest) : EditUserResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.putUser(actionParams.tenantId, data.userId)}`
    
    const result = await putAsync<EditUserResponse, UpdateUserRequest>({
      actionName: 'Update User',
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const checkUserEmail = async (actionParams: ActionParams, data: CheckUserEmailRequest): CheckUserEmailResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.checkUserEmail(actionParams.tenantId, data.email)}`

    const result = await getAsync<CheckUserEmailResponse>({
      actionName: 'Check email status',
      url,
      apiConfig: actionParams.config.api
    })

    return result
  }
    
  const inviteUser = async (actionParams: ActionParams, data: InviteUserRequest): InviteUserResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.postSendInvitation(actionParams.tenantId)}`
    
    const result = await postAsync<InviteUserResponse, InviteUserRequest>({ 
      actionName: 'Invite User',
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }
    
  const getInvitationsList = async (actionParams: ActionParams, data: GetInvitationsListRequest): GetInvitationsListResult => {
    const { pageIndex, pageSize, orderBy, filter } = data
    const baseUrl = actionParams.edxApiUrl
    let queryParams = `pageIndex=${pageIndex}&pageSize=${pageSize}&orderBy=${orderBy}`
    
    if (filter) {
      queryParams = `${queryParams}&filter=${filter}`
    }
    
    const url = `${baseUrl}/${adminActionRoutes.getInvitationsList(actionParams.tenantId)}?${queryParams}`
        
    const result = await getAsync<GetInvitationsListResponse>({ 
      actionName: 'Get Invitations List',  
      url,
      apiConfig: actionParams.config.api
    })
    
    if (result.type === 'Response') {
      const mappedResult: HttpServiceResponse<Invitation[]> = {
        data: UsersResponseMapper.mapToInvitationList(result.data),
        type: 'Response'
      }
    
      return mappedResult
    }
    
    return result
  }

  const deleteInvitation = async (actionParams: ActionParams, data: DeleteInvitationRequest): DeleteInvitationResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.deleteInvitationById(actionParams.tenantId, data.invitationId)}`

    const result = await deleteAsync<void>({
      actionName: 'Delete Invitation',
      url,
      apiConfig: actionParams.config.api
    })

    return result
  }
    
  const assignLicense = async (actionParams: ActionParams, data: AssignLicenseRequest): AssignLicenseResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.putAssignLicense(actionParams.tenantId, data.userId? data.userId : '')}`
    
    const result = await putAsync<AssignLicenseResponse, AssignLicenseRequest>({
      actionName: 'Assign License',
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }
    
  const revokeLicense = async (actionParams: ActionParams, data: RevokeLicenseRequest): RevokeLicenseResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.putRevokeLicense(actionParams.tenantId, data.userId? data.userId : '')}`
    
    const result = await putAsync<RevokeLicenseResponse, RevokeLicenseRequest>({
      actionName: 'Revoke License',
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }
    
  const assignBulkLicenses = async (actionParams: ActionParams, data: AssignBulkLicensesRequest): AssignBulkLicensesResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.putAssignBulkUserLicenses(actionParams.tenantId, data.userId)}`
    
    const result = await putAsync<AssignBulkLicensesResponse, AssignBulkLicensesResponse>({
      actionName: 'Assign Bulk Licenses',
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }
    
  const revokeBulkLicenses = async (actionParams: ActionParams, data: RevokeBulkLicensesRequest): RevokeBulkLicensesResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.putRevokeBulkUserLicenses(actionParams.tenantId, data.userId)}`
    
    const result = await putAsync<RevokeBulkLicensesResponse, RevokeBulkLicensesRequest>({
      actionName: 'Update User',
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const getOrganizations = async (actionParams: ActionParams, requestData: GetOrganizationsRequest): GetOrganizationsResult => {
    const { pageIndex, pageSize, orderBy } = requestData
    const baseUrl = actionParams.edxApiUrl
    let queryParams = `pageIndex=${pageIndex}&pageSize=${pageSize}`
        
    if (requestData.filter) {
      queryParams = `${queryParams}&filter=${requestData.filter}`
    }

    if (orderBy) {
      queryParams = `${queryParams}&orderBy=${orderBy}`
    }

    const url = `${baseUrl}/${adminActionRoutes.getOrganizations(actionParams.tenantId)}?${queryParams}`
    
    const result = await getAsync<GetOrganizationsResponse>({ 
      actionName: 'Get Organizations List',  
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const getStaffClassifications = async (actionParams: ActionParams, requestData: GetStaffClassificationsRequest): GetStaffClassificationsResult => {
    const { pageIndex, pageSize, orderBy } = requestData
    const baseUrl = actionParams.edxApiUrl
    let queryParams = `pageIndex=${pageIndex}&pageSize=${pageSize}`
        
    if (requestData.filter) {
      queryParams = `${queryParams}&filter=${requestData.filter}`
    }

    if (orderBy) {
      queryParams = `${queryParams}&orderBy=${orderBy}`
    }

    const url = `${baseUrl}/${adminActionRoutes.getStaffClassifications(actionParams.tenantId)}?${queryParams}`
    
    const result = await getAsync<GetStaffClassificationsResponse>({ 
      actionName: 'Get Staff Classifications List',  
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const getUserEducationOrganization = async (actionParams: ActionParams, requestData: GetUserEducationOrganizationsRequest): GetUserEducationOrganizationsResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.getEducationOrganizations(actionParams.tenantId, requestData.userId)}`
    
    const result = await getAsync<UserEducationOrganization>({ 
      actionName: 'Get User Education Organization',  
      url,
      apiConfig: actionParams.config.api
    })

    console.log('result user education organizations', result)
    
    return result
  }

  const createUserEducationOrganization = async (actionParams: ActionParams, data: CreateUserEducationOrganizationsRequest): CreateUserEducationOrganizationResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.createEducationOrganization(actionParams.tenantId, data.userId)}`
    
    const result = await postAsync<CreateUserEducationOrganizationsResponse, CreateUserEducationOrganizationsRequest>({ 
      actionName: 'Create User Education Organization',
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const updateUserEducationOrganization = async (actionParams: ActionParams, data: UpdateUserEducationOrganizationsRequest): UpdateUserEducationOrganizationResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.updateEducationOrganization(actionParams.tenantId, data.userId, data.educationOrganizationId)}`
    
    const result = await putAsync<UpdateUserEducationOrganizationResponse, UpdateUserEducationOrganizationsRequest>({
      actionName: 'Update User Education Organization',
      data,
      url,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const deleteUserEducationOrganization = async (actionParams: ActionParams, data: DeleteUserEducationOrganizationsRequest): DeleteUserEducationOrganizationResult => {
    const baseUrl = actionParams.edxApiUrl
    const url = `${baseUrl}/${adminActionRoutes.deleteEducationOrganization(actionParams.tenantId, data.userId, data.educationOrganizationId)}`

    const result = await deleteAsync<DeleteUserEducationOrganizationResponse>({
      actionName: 'Delete User Education Organization',
      url,
      apiConfig: actionParams.config.api
    })

    return result
  }
    
  return {
    getUsersList,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    activateUser, 
    deleteInvitation,
    deactivateUser,
    checkUserEmail,
    inviteUser,
    getInvitationsList,
    getOrganizations,
    getStaffClassifications,
    getUserEducationOrganization,
    createUserEducationOrganization,
    updateUserEducationOrganization,
    deleteUserEducationOrganization,
    assignLicense,
    revokeLicense,
    assignBulkLicenses,
    revokeBulkLicenses,
  }
}

export default useUserService