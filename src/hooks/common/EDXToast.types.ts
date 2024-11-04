export type EDXToastType = 'Success' | 'Error'
export type EDXToastContent = JSX.Element | string

export interface EDXToastParams {
    content: EDXToastContent
    type: EDXToastType
}