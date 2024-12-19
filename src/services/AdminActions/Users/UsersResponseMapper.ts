import {
  AppUser, AppUserRole, AppUserStatus
} from '../../../core/AppUser.types'
import {
  Invitation, InvitationStatus
} from '../../../core/invitations/Invitation.types'
import getTimeAgo from '../../../helpers/getTimeAgo'
import { AppUserListData } from './UsersResponseMapper.types'
import {
  GetInvitationsListResponse, GetUsersListResponse
} from './UsersService.responses'

class UsersResponseMapper {
  public static mapToUsersList(response: GetUsersListResponse, tenantId: string): AppUserListData {
    const usersList: AppUser[] = response.data.map(apiUser => {
      // const tenantData = apiUser.tenants.find(tenant => tenant.tenantId === tenantId)

      const appUser: AppUser = {
        userId: apiUser.userId,
        userName: apiUser.userName,
        firstName: apiUser.firstName,
        lastName: apiUser.lastName,
        status: apiUser.status ? this.mapUserStatus(apiUser.status) : 'Unknown',
        email: apiUser.email,
        updated: getTimeAgo(Date.parse(apiUser.lastModifiedDateTime))
      }

      return appUser
    })

    const data: AppUserListData = {
      count: response.count ?? 0,
      pageSize: response.pageSize ?? 0,
      data: usersList
    }

    return data
  }
    
  public static mapToInvitationList(response: GetInvitationsListResponse): Invitation[] {
    const invitationsList: Invitation[] = response.data.map(apiInvitation => {
      const invitation: Invitation = {
        tenantId: apiInvitation.tenantId,
        invitationId: apiInvitation.invitationId,
        firstName: apiInvitation.firstName,
        lastName: apiInvitation.lastName,
        email: apiInvitation.email,
        role: apiInvitation.role,
        invitationStatus: this.mapInvitationStatus(apiInvitation.invitationStatus),
        invitationToken: apiInvitation.invitationToken,
        invitationSendDateTime: apiInvitation.invitationSendDateTime,
        assignLicenseRequests: apiInvitation.assignLicenseRequests
      }

      return invitation
    })

    return invitationsList
  }

  public static mapInvitationStatus(value: string | number): InvitationStatus {
    if (value === 1) {
      return 'Sent'
    }

    if (value === 2) {
      return 'Accepted'
    }
        
    return 'Unknown'
  }

  private static mapUserStatus(value: string | number): AppUserStatus {
    if (value == 1 || value === 'Active') {
      return 'Active'
    }
        
    if (value == 2 || value === 'Inactive') {
      return 'Inactive'
    }

    return 'Active'
  }

  private static mapUserRoles(rolesList: string[]) {
    const userRoles: AppUserRole[] = rolesList.map(role => {
      const userRole: AppUserRole = role === 'Tenant.User'? 'Tenant.User' : 'Tenant.Admin'

      return userRole
    })

    return userRoles
  }
}

export default UsersResponseMapper