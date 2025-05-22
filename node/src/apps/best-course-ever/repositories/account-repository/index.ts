import type { IAccountRepository, Account } from './types'
import { Result } from '../types'

export class AccountRepository implements IAccountRepository {
    async createAccount(data: Pick<Account, 'userId' | 'type'>): Promise<Result<Account>> {
        throw new Error('Not implemented')
    }
}
