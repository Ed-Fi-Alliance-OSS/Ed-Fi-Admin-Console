import { AppUser } from '../../../core/AppUser.types'
import { CreateUserFormData, CreateUserFormLicensesData } from './useCreateUserForm.types'

export const setInitialData = (editUserInitialData?: AppUser) : CreateUserFormData => {
  if (editUserInitialData) {
        
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
                
        if (roles.length > 0) 
          formLicense.roles = roles
                
        return formLicense
      })
    }
        
    console.log('user data in create invitation', data)
    return data
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