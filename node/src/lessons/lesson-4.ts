import { Transform, pipeline } from 'node:stream'
import fs from 'node:fs'
import path from 'node:path'


function reader(path: string) {
    return fs.createReadStream(path, { encoding: 'utf-8' })
}

function writer(path: string) {
    return fs.createWriteStream(path, { encoding: 'utf-8' })
}

const toWordsArrayTransformer = new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
        const words = chunk.toString().split(/\s+/)
        callback(null, words)
    }
})

const toFilteredWordsArrayTransformer = new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
        const filteredWords = chunk.map((word: string) => word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase())
        callback(null, filteredWords)
    }
})

const toWordsCountTransformer = new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
        const wordsCount = chunk.reduce((acc: Record<string, number>, word: string) => {
            acc[word] = (acc[word] || 0) + 1
            return acc
        }, {})

        console.log('[words count]', wordsCount)
        callback(null, wordsCount)
    }
})

const toVectorTransformer = new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
        const vectored = Object.entries(chunk).sort((a, b) => a[0].localeCompare(b[0])).map(([_, count]) => count)

        console.log('[vectored]', vectored)

        callback(null, vectored)
    }
})

const toStringTransformer = new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
        callback(null, JSON.stringify(chunk))
    }
})

function run(inputFile: string, outputFile: string) {
    pipeline(
        reader(inputFile),
        toWordsArrayTransformer,
        toFilteredWordsArrayTransformer,
        toWordsCountTransformer,
        toVectorTransformer,
        toStringTransformer,
        writer(outputFile),
        (err: Error | null) => {
            if (err) {
                console.error('Pipeline failed', err)
            } else {
                console.log('\x1b[1;97;42m Pipeline succeeded \x1b[0m')
            }
        }
    )
}

function createOutputFile(outputFile: string) {
    const outputDir = outputFile.split(path.sep).slice(0, -1).join(path.sep)
    if (outputDir && !fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }
    fs.writeFileSync(outputFile, '')
}

if (!process.env.INPUT_FILE || !process.env.OUTPUT_FILE) {
    console.error('INPUT_FILE and OUTPUT_FILE must be set')
    process.exit(1)
}

if (!fs.existsSync(process.env.OUTPUT_FILE)) {
    console.log('[OUTPUT_FILE does not exist, creating it]')
    createOutputFile(process.env.OUTPUT_FILE)
}

run(process.env.INPUT_FILE, process.env.OUTPUT_FILE)