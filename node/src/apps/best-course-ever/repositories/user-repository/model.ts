import { Schema, model } from 'mongoose'
import { passwordValidation } from '@app/utils/validators'
import isEmail from 'validator/lib/isEmail'
import bcrypt from 'bcryptjs'
import type { User } from './types'


const userSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => isEmail(value),
            message: 'Invalid email'
        }
    },
    password: {
        type: String,
        required: true,
        select: false,
        validate: {
            validator: passwordValidation.validate,
            message: passwordValidation.message
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },
    deletedAt: {
        type: Date,
        default: null,
        select: false
    },
    isBlocked: {
        type: Boolean,
        default: false,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false,
        select: false
    },
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.pre('deleteOne', async function () {
    const user = this
    await user.updateOne({ $set: { isDeleted: true, deletedAt: new Date() } })

    return
})

userSchema.pre('deleteMany', async function () {
    const users = this
    await users.updateMany({ $set: { isDeleted: true, deletedAt: new Date() } })

    return
})


export const UserModel = model('User', userSchema)