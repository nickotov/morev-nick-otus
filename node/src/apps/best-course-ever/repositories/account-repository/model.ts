import { Schema, model } from 'mongoose'
import { Account } from './types'

const AccountSchema = new Schema<Account>({
    userId: {
        type: String,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['admin', 'client', 'expert'],
    },
})

export const AccountModel = model('Account', AccountSchema)