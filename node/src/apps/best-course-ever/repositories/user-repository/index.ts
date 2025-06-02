import mongoose from 'mongoose'
import type { IUserRepository, User, UserQuery } from './types'
import { UserModel } from './model'
import type { Result } from '../types'


export class UserRepository implements IUserRepository {
    async createUser(data: Pick<User, 'email' | 'password'>): Promise<Result<User>> {
        try {
            const user = await UserModel.create(data)

            return {
                data: user,
                error: null
            }
        } catch (error) {
            const errors: string[] = []

            if (error instanceof mongoose.Error.ValidationError) {
                if (error.errors.password) {
                    errors.push(error.errors.password.message)
                }

                if (error.errors.email) {
                    errors.push(error.errors.email.message)
                }
            } else {
                errors.push('Invalid data')
            }

            return {
                data: null,
                error: errors.join('\n')
            }
        }
    }

    async getUsers({ page = 0, limit = 10 }: UserQuery = {}): Promise<Result<User[]>> {
        const users = await UserModel.find()
            .skip(page * limit)
            .limit(limit)
            .exec()

        return {
            data: users,
            error: null
        }
    }

    async getUser(id: string): Promise<Result<User>> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return {
                data: null,
                error: 'Invalid user id'
            }
        }

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

    async updateUser(id: string, user: Partial<User>): Promise<Result<User>> {
        const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true })

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
