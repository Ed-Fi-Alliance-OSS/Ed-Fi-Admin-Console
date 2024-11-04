import { EdFiConnectionVerificationStatus } from '../../edfi/useEdFiConnectionForm.types'

export interface EdFiSettingsConnectionsTableItem {
    connectionId: string 
    status: EdFiConnectionVerificationStatus
}