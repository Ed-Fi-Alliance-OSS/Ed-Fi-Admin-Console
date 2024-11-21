import { AppUser } from '../../../../core/AppUser.types'
import {
  CreateUserFormData, CreateUserFormLicensesData, UserFormMode 
} from '../useCreateUserForm.types'

export const setInitialData = (editUserInitialData?: AppUser, mode?: UserFormMode) : CreateUserFormData => {
  if (editUserInitialData) {
    console.log('user data in update', editUserInitialData.licenses)

    const data: CreateUserFormData = {
      userName: editUserInitialData.userName,
      firstName: editUserInitialData.firstName,
      lastName: editUserInitialData.lastName,
      email: editUserInitialData.email,
      role: editUserInitialData.roles[0],
      licenses: editUserInitialData.licenses.map(license => {
        const roles: string[] = license.applicationRole? license.applicationRole.map(role => role.role) : []

        const formLicense: CreateUserFormLicensesData = {
          applicationId: license.applicationId,
          subscriptionId: license.tenantSubscriptionId,
          tenantId: license.subscriptionTenantId,
          userId: editUserInitialData.userId
        }

        if (roles.length > 0) {
          formLicense.roles = roles
        }

        return formLicense
      })
    }

    console.log('initial data if user is edited', editUserInitialData)

    return data
  } else if (mode === 'Invite Admin') {
    const initialAdminUserData: CreateUserFormData = {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      role: 'Tenant.User',
      licenses: []
    }

    initialAdminUserData.role = 'Tenant.Admin'

    return initialAdminUserData
  }

  return {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    role: 'Tenant.User',
    licenses: []
  }
}