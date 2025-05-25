import dotenv from 'dotenv'
import path from 'path'
import { cleanEnv, str } from 'envalid'

dotenv.config({ path: path.resolve(__dirname, '.env') })

const env = cleanEnv(process.env, {
    BEST_COURSE_EVER_PORT: str({ default: '4444' }),
    MONGODB_URI: str({ default: 'mongodb://localhost:27017' }),
    MONGODB_DB: str({ default: 'best-course-ever' }),
})

export const config = {
    appPort: env.BEST_COURSE_EVER_PORT,
    mongodb: {
        uri: env.MONGODB_URI,
        db: env.MONGODB_DB
    }
}
