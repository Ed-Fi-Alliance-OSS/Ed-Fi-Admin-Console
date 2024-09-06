export type SISProviderConnectionState = 'Awaiting Connection' | 'Connected'

export interface SISProviderInfo {
    name: string 
    source: string
    status: SISProviderConnectionState
}