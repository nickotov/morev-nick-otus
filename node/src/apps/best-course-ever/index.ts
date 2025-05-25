import express from 'express'
import { config } from './config'
import { log } from '@/utils/logger'
import { MongoDbClient } from './db'
import { registerRoutes } from './routes'

export const startApp = async () => {
    const app = express()

    app.get('/', (req, res) => {
        res.send('Hello World!!!')
    })

    registerRoutes(app)


    await MongoDbClient.getInstance().connect()

    const server = app.listen(config.appPort, () => {
        log(`Server is running on: http://localhost:${config.appPort}`, 'success')
    })

    // Handle graceful shutdown
    const shutdown = async () => {
        log('Shutting down server...', 'info')

        server.close(() => log('HTTP server closed', 'info'))

        try {
            await MongoDbClient.getInstance().disconnect()
            log('MongoDB connection closed', 'success')
        } catch (error) {
            log(`Error during MongoDB disconnect: ${error}`, 'error')
        }

        process.exit(0)
    }

    // Listen for termination signals
    process.on('SIGTERM', shutdown)
    process.on('SIGINT', shutdown)
}
