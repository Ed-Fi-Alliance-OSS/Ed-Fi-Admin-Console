import { EdxAppConfig } from '@edfi/admin-console-shared-sdk'

export interface ActionParams {
    tenantId: string 
    token: string
    config: EdxAppConfig
    edxApiUrl: string
}

export interface EdfiActionParams {
    tenantId: string
    config: EdxAppConfig
    token: string
    edxApiUrl: string
}