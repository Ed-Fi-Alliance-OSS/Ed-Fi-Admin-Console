export type InvitationStatus = 'Unknown' | 'Sent' | 'Accepted'

export interface InvitationRoles {
    tenantId: string 
    applicationId: string 
    roles: string[]
}

export interface Invitation {
    tenantId: string 
    invitationId: string 
    firstName: string 
    lastName: string 
    email: string 
    role: string 
    invitationToken: string
    invitationStatus: InvitationStatus
    invitationSendDateTime: string 
    assignLicenseRequests: InvitationRoles[]
}