import { promisify } from 'node:util'
import { Transform, pipeline } from 'node:stream'
import readline from 'node:readline'
import fs from 'node:fs'

const pipelineAsync = promisify(pipeline)

export class TextVectorization {
    private wordsCounterObject: Record<string, number> = {};

    constructor(private readonly inputFile: string, private readonly outputFile: string) {
        this.inputFile = inputFile
        this.outputFile = outputFile
    }

    public async vectorize() {
        const outputFile = this.outputFile

        await pipelineAsync(
            this.readerByLine(),
            this.textCleaner(),
            this.wordsCounter(),
        )

        this.writerStream(outputFile, this.objectToVector())
    }

    private readerByLine() {
        const readerStream = this.readerStream(this.inputFile)

        return readline.createInterface({ input: readerStream })
    }

    private readerStream(from: string) {
        return fs.createReadStream(from, { encoding: 'utf-8' })
    }

    private writerStream(to: string, data: Object) {
        return fs.createWriteStream(to, { encoding: 'utf-8' }).write(JSON.stringify(data))
    }

    private textCleaner() {
        return new Transform({
            transform(chunk, _, callback) {
                // Remove everything except alphanumeric chars and hyphens within words
                // Keep: letters, numbers, and hyphens between alphanumeric characters
                const cleaned = chunk.toString()
                    .replace(/[^a-zA-Z0-9\s-]|(\s-|-\s)/g, '')
                    .toLowerCase();
                callback(null, cleaned);
            }
        })
    }

    private wordsCounter() {
        const wordsCounterObject = this.wordsCounterObject

        return new Transform({
            objectMode: true,
            transform(chunk, _, callback) {
                const words = chunk.toString().split(/\s+/)
                words.forEach((word: string) => {
                    wordsCounterObject[word] = (wordsCounterObject[word] || 0) + 1
                })
                callback()
            },
        })
    }

    private objectToVector() {
        return Object.entries(this.wordsCounterObject).sort((a, b) => a[0].localeCompare(b[0])).map(([_, count]) => count)
    }
}