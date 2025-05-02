import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') })

export const config = {
    appPort: process.env.BEST_COURSE_EVER_PORT || 4444
}
