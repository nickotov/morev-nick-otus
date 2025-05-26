import type { IAccountRepository, Account } from './types'
import { AccountModel } from './model'
import { UserRepository } from '../user-repository'
import { Result } from '../types'

export class AccountRepository implements IAccountRepository {
    async createAccount(data: Pick<Account, 'userId' | 'type'>): Promise<Result<Account>> {
        try {
            const userRepository = new UserRepository()
            const user = await userRepository.getUser(data.userId)

            if (user.error) {
                return {
                    data: null,
                    error: user.error
                }
            }

            const existingAccount = await AccountModel.findOne({ userId: data.userId })

            if (existingAccount && existingAccount.type === data.type) {
                return {
                    data: null,
                    error: 'Account already exists'
                }
            }

            // TODO: add extra conditions for admin account
            if (data.type === 'admin') {
                return {
                    data: null,
                    error: 'Admin account cannot be created'
                }
            }

            const account = await AccountModel.create(data)

            return {
                data: account,
                error: null
            }
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Invalid account data'
            }
        }
    }

    async getAccount(id: string): Promise<Result<Account>> {
        const account = await AccountModel.findById(id)

        if (!account) {
            return {
                data: null,
                error: 'Account not found'
            }
        }

        return {
            data: account,
            error: null
        }
    }

    async getAccounts(): Promise<Result<Account[]>> {
        const accounts = await AccountModel.find()

        return {
            data: accounts,
            error: null
        }
    }

    async deleteAccount(id: string): Promise<Result<Account>> {
        const account = await AccountModel.findByIdAndDelete(id)

        if (!account) {
            return {
                data: null,
                error: 'Account not found'
            }
        }

        return {
            data: account,
            error: null
        }
    }
}
