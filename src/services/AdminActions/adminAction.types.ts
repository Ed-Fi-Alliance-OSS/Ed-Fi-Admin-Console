import { EdxAppConfig } from "@edwire/edx-portal-shared"

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