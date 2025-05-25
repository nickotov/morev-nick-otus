import type { IUserRepository, User } from './types'
import { UserModel } from './model'
import type { Result } from '../types'

export class UserRepository implements IUserRepository {
    async createUser(data: Pick<User, 'email' | 'password'>): Promise<Result<User>> {
        const user = await UserModel.create(data)

        return {
            data: user,
            error: null
        }
    }

    async getUsers(): Promise<Result<User[]>> {
        const users = await UserModel.find()

        return {
            data: users,
            error: null
        }
    }

    async getUser(id: string): Promise<Result<User>> {
        const user = await UserModel.findById(id)

        let error: string | null = null

        if (!user) {
            error = 'User not found'
        }

        return {
            data: user,
            error
        }
    }

    async updateUser(user: Partial<User> & { _id: string }): Promise<Result<User>> {
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, { new: true })

        let error: string | null = null

        if (!updatedUser) {
            error = 'User not found'
        }

        return {
            data: updatedUser,
            error
        }
    }

    async deleteUser(id: string): Promise<Result<User>> {
        const deletedUser = await UserModel.findByIdAndDelete(id)

        let error: string | null = null

        if (!deletedUser) {
            error = 'User not found'
        }

        return {
            data: deletedUser,
            error
        }
    }
}
