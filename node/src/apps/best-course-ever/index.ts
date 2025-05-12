import express from 'express'
import { config } from './config'
import { log } from '@/utils/logger'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(config.appPort, () => {
    log(`Server is running on: http://localhost:${config.appPort}`, 'success')
})
