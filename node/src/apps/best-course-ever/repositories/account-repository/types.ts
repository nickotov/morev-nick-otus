import type { Result } from '../types'

export type AccountType = 'admin' | 'client' | 'expert'

export interface Account {
    _id: string
    userId: string // related to User._id
    type: AccountType
}

export interface IAccountRepository {
    createAccount(data: Pick<Account, 'userId' | 'type'>): Promise<Result<Account>>
}
