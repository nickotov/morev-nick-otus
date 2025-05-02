import { AccountRepository } from './index'
import type { Account } from './types'

describe('AccountRepository', () => {
    let accountRepository: AccountRepository

    beforeEach(() => {
        accountRepository = new AccountRepository()
        jest.resetAllMocks()
    })

    describe('createAccount', () => {
        test('should throw not implemented error for admin account', async () => {
            // Arrange
            const accountData: Pick<Account, 'userId' | 'type'> = {
                userId: 'user123',
                type: 'admin'
            }

            // Act & Assert
            await expect(accountRepository.createAccount(accountData)).rejects.toThrow(
                'Not implemented'
            )
        })

        test('should throw not implemented error for client account', async () => {
            // Arrange
            const accountData: Pick<Account, 'userId' | 'type'> = {
                userId: 'user456',
                type: 'client'
            }

            // Act & Assert
            await expect(accountRepository.createAccount(accountData)).rejects.toThrow(
                'Not implemented'
            )
        })

        test('should throw not implemented error for expert account', async () => {
            // Arrange
            const accountData: Pick<Account, 'userId' | 'type'> = {
                userId: 'user789',
                type: 'expert'
            }

            // Act & Assert
            await expect(accountRepository.createAccount(accountData)).rejects.toThrow(
                'Not implemented'
            )
        })
    })
})
