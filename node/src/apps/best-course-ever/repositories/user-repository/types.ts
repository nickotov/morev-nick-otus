import type { Result } from '../types'

export interface User {
    _id: string
    email: string
    password: string
    createdAt: Date
    isDeleted: boolean
    isBlocked: boolean
    isVerified: boolean
}

export interface IUserRepository {
    createUser(data: Pick<User, 'email' | 'password'>): Promise<Result<User>>
    getUsers(): Promise<Result<User[]>>
    getUser(id: string): Promise<Result<User>>
    updateUser(id: string, user: Partial<User>): Promise<Result<User>>
    deleteUser(id: string): Promise<Result<User>>
}
