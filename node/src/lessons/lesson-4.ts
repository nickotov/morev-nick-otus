import fs from 'node:fs'
import path from 'node:path'
import { TextVectorization } from '@/utils/text-vectorizer'
import { log } from '@/utils/logger'


if (!process.env.INPUT_FILE || !process.env.OUTPUT_FILE) {
    log('INPUT_FILE and OUTPUT_FILE must be set', 'error')
    process.exit(1)
}

if (!fs.existsSync(process.env.OUTPUT_FILE)) {
    log('[OUTPUT_FILE does not exist, creating it]', 'info')
    createOutputFile(process.env.OUTPUT_FILE)
}


const vectorizer = new TextVectorization(process.env.INPUT_FILE, process.env.OUTPUT_FILE)

vectorizer
    .vectorize()
    .catch((error) => log('Error:' +  error, 'error'))

function createOutputFile(outputFile: string) {
    const outputDir = outputFile.split(path.sep).slice(0, -1).join(path.sep)

    if (outputDir && !fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }
    fs.writeFileSync(outputFile, '')
}