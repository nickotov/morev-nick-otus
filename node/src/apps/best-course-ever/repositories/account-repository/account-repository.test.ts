import { AccountRepository } from './index'
import type { Account } from './types'


describe('AccountRepository', () => {
    let accountRepository: AccountRepository

    beforeEach(() => {
        accountRepository = new AccountRepository()
        jest.resetAllMocks()
    })

    describe('createAccount', () => {
        test('should create and return a new admin account', async () => {
            // Arrange
            const accountData: Pick<Account, 'userId' | 'type'> = {
                userId: 'user123',
                type: 'admin'
            }

            // Act
            const result = await accountRepository.createAccount(accountData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            expect(result.data._id).toBeDefined()
            expect(result.data.userId).toBe(accountData.userId)
            expect(result.data.type).toBe(accountData.type)
        })

        test('should create and return a new client account', async () => {
            // Arrange
            const accountData: Pick<Account, 'userId' | 'type'> = {
                userId: 'user456',
                type: 'client'
            }

            // Act
            const result = await accountRepository.createAccount(accountData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            expect(result.data._id).toBeDefined()
            expect(result.data.userId).toBe(accountData.userId)
            expect(result.data.type).toBe(accountData.type)
        })

        test('should create and return a new expert account', async () => {
            // Arrange
            const accountData: Pick<Account, 'userId' | 'type'> = {
                userId: 'user789',
                type: 'expert'
            }

            // Act
            const result = await accountRepository.createAccount(accountData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            expect(result.data._id).toBeDefined()
            expect(result.data.userId).toBe(accountData.userId)
            expect(result.data.type).toBe(accountData.type)
        })
    })
})
