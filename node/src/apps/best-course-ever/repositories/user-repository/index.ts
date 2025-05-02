import type { IUserRepository, User } from './types'
import type { Result } from '../types'

export class UserRepository implements IUserRepository {

    async createUser(data: Pick<User, 'email' | 'password'>): Promise<Result<User>> {
        throw new Error('Not implemented')
    }

    async getUser(id: string): Promise<Result<User>> {
        throw new Error('Not implemented')
    }

    async updateUser(user: Partial<User> & { _id: string }): Promise<Result<User>> {
        throw new Error('Not implemented')
    }

    async deleteUser(id: string): Promise<Result<User>> {
        throw new Error('Not implemented')
    }
}