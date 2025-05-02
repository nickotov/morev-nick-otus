import { UserRepository } from './index'
import type { User } from './types'


describe('UserRepository', () => {
    let userRepository: UserRepository

    beforeEach(() => {
        userRepository = new UserRepository()
        jest.resetAllMocks()
    })

    describe('createUser', () => {
        test('should create and return a new user', async () => {
            // Arrange
            const userData = {
                email: 'test@example.com',
                password: 'password123'
            }

            // Act
            const result = await userRepository.createUser(userData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            expect(result.data._id).toBeDefined()
            expect(result.data.email).toBe(userData.email)
            expect(result.data.password).toBe(userData.password)
            expect(result.data.createdAt).toBeInstanceOf(Date)
            expect(result.data.isDeleted).toBe(false)
            expect(result.data.isBlocked).toBe(false)
            expect(result.data.isVerified).toBe(false)
        })
    })

    describe('getUser', () => {
        test('should return a user by ID', async () => {
            // Arrange
            const userId = '123456789'

            // Act
            const result = await userRepository.getUser(userId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            expect(result.data._id).toBe(userId)
        })
    })

    describe('updateUser', () => {
        test('should update and return the updated user', async () => {
            // Arrange
            const userData: Partial<User> & { _id: string } = {
                _id: '123456789',
                email: 'updated@example.com',
                isVerified: true
            }

            // Act
            const result = await userRepository.updateUser(userData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            expect(result.data._id).toBe(userData._id)
            expect(result.data.email).toBe(userData.email)
            expect(result.data.isVerified).toBe(userData.isVerified)
        })
    })

    describe('deleteUser', () => {
        test('should mark user as deleted and return the user', async () => {
            // Arrange
            const userId = '123456789'

            // Act
            const result = await userRepository.deleteUser(userId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            expect(result.data._id).toBe(userId)
            expect(result.data.isDeleted).toBe(true)
        })
    })
})
