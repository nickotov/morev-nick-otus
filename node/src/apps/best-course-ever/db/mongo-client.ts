import { Db, MongoClient } from 'mongodb'
import { config } from '@/apps/best-course-ever/config'

export class DatabaseClient {
    private static instance: DatabaseClient
    private client: MongoClient
    public db: Db

    private constructor() {
        this.client = new MongoClient(config.mongodb.uri)
        this.db = this.client.db(config.mongodb.db)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DatabaseClient()
        }
        return this.instance
    }

    public async connect() {
        await this.client.connect()
    }

    public async disconnect() {
        await this.client.close()
    }
}
