/**
 * Task: Написать утилиту tree для удобного показа структуры файлов директории.
Утилита должна принимать на вход обязательный аргумент — путь до директории для показа ее структуры.
Также она должна понимать опцию глубину показа --depth, -d с числом в качестве значения.
Example: node tree Node.js -d 2
 */
import fs from 'node:fs/promises'

const MAX_DEPTH_FROM_ENV = Number(process.env.MAX_DEPTH)

const MAX_DEPTH = MAX_DEPTH_FROM_ENV ? MAX_DEPTH_FROM_ENV : 100

export const tree = async (params: { path: string, maxDepth: number } = getParamsFromCLI()) => {
    const { path, maxDepth } = params

    if (!path) {
        throw new Error('Path is required')
    }

    let directories = 0
    let files = 0

    fs.access(path, fs.constants.F_OK)
    .catch(() => {
        throw new Error('Path is not valid')
    })

    if (await checkIsChild(path)) {
        files = 1
        printTreeStats(directories, files)
        return
    }

    await traverse(path, 0)

    async function traverse(path: string, depth: number, isLastParent: boolean = false) {
        const children = await getChildren(path)
        const lastIndex = children.length - 1

        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            const childPath = `${path}/${child}`
            const name = child.split('/').pop()

            if (!name) {
                throw new Error('Child name is not valid')
            }

            const isParent = await checkIsParent(childPath)
            const isLast = i === lastIndex

            printLine(name, depth, isLast)

            const newDepth = depth + 1

            if (newDepth >= maxDepth) {
                continue
            }

            if (isParent) {
                await traverse(childPath, newDepth, isLast)
            }
        }
    }
}

function getParamsFromCLI() {
    const args = process.argv.slice(2)
    const path = args[0]

    const maxDepth = ['-d', '--depth'].includes(args[1]) && +args[2] ? +args[2] : MAX_DEPTH

    return { path, maxDepth }
}

async function checkIsParent(path: string) {
    const stats = await fs.stat(path)
    return stats.isDirectory()
}

async function checkIsChild(path: string) {
    const stats = await fs.stat(path)
    return stats.isFile()
}

function printLine(text: string, depth: number, isLast: boolean) {
    const prefix = depth === 0
        ? ''
        : '│   '.repeat(depth - 1) + (isLast ? '└── ' : '├── ')
    console.log(prefix + text)
}

async function getChildren(path: string) {
    return fs.readdir(path)
}

function printTreeStats(numberOfFolders: number, numberOfFiles: number) {
    console.log(`Total folders: ${numberOfFolders}`)
    console.log(`Total files: ${numberOfFiles}`)
}
