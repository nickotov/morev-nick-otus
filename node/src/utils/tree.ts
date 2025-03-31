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

    printLine(path.split('/').pop() || 'UNKNOWN', 0, [])

    await traverse(path, 1)

    printTreeStats(directories, files)

    async function traverse(path: string, depth: number = 0, prefixes: string[] = []) {
        const children = await getChildren(path)
        const lastIndex = children.length - 1

        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            const childPath = `${path}/${child}`

            const isParent = await checkIsParent(childPath)
            const isLastChild = i === lastIndex

            if (isParent) {
                directories++
            } else {
                files++
            }

            const newPrefixes = [...prefixes]

            if (isLastChild) {
                newPrefixes.push('└── ')
            } else {
                newPrefixes.push('├── ')
            }

            printLine(child, depth, newPrefixes)

            if (depth >= maxDepth || !isParent) {
                continue
            }

            const nextPrefixes = [...prefixes]

            if (isLastChild) {
                nextPrefixes.push('    ')
            } else {
                nextPrefixes.push('│   ')
            }

            await traverse(childPath, depth + 1, nextPrefixes)
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

function printLine(text: string, depth: number, prefixes: string[]) {
    const prefix = depth === 0
        ? ''
        : prefixes.join('')
    console.log(prefix + text)
}

async function getChildren(path: string) {
    return fs.readdir(path)
}

function printTreeStats(numberOfFolders: number, numberOfFiles: number) {
    console.log(`Total folders: ${numberOfFolders}`)
    console.log(`Total files: ${numberOfFiles}`)
}
