import mongoose from 'mongoose'
import { config } from '@app/config'

export class DatabaseClient {
    private static instance: DatabaseClient
    private client: mongoose.Mongoose

    private constructor() {
        this.client = mongoose
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DatabaseClient()
        }
        return this.instance
    }

    public async connect() {
        await this.client.connect(`${config.mongodb.uri}/${config.mongodb.db}`)
    }

    public async disconnect() {
        await this.client.disconnect()
    }
}
