import { AppUser } from '../../../core/AppUser.types'

export interface AppUserListData {
    count: number 
    pageSize: number 
    data: AppUser[]
}