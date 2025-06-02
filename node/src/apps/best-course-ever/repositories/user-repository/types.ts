import type { Result } from '../types'

export interface User {
    _id: string
    email: string
    password: string
    createdAt: Date
    isDeleted: boolean
    deletedAt: Date | null
    isBlocked: boolean
    isVerified: boolean
}

export interface IUserRepository {
    createUser(data: Pick<User, 'email' | 'password'>): Promise<Result<User>>
    getUsers(query?: UserQuery): Promise<Result<User[]>>
    getUser(id: string): Promise<Result<User>>
    updateUser(id: string, user: Partial<User>): Promise<Result<User>>
    deleteUser(id: string): Promise<Result<User>>
}

export interface UserQuery {
    page?: number
    limit?: number
}
