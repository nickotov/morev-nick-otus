import type { Result } from '../types'

export type AccountType = 'admin' | 'client' | 'expert'

export interface Account {
    _id: string
    userId: string // related to User._id
    type: AccountType
}

export interface IAccountRepository {
    createAccount(data: Pick<Account, 'userId' | 'type'>): Promise<Result<Account>>
    getAccount(id: string): Promise<Result<Account>>
    getAccounts(query?: AccountQuery): Promise<Result<Account[]>>
    deleteAccount(id: string): Promise<Result<Account>>
}

export interface AccountQuery {
    page?: number
    limit?: number
}