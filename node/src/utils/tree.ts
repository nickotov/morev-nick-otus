import fs from 'node:fs/promises'
import nodePath from 'node:path'

// DISCLAIMER: if not a course, i'd probably use directory-tree package

interface TreeParams {
    path: string
    maxDepth?: number
}

const DEFAULT_MAX_DEPTH = 100

export const tree = async (params: TreeParams = getTreeParams()) => {
    const { path, maxDepth = DEFAULT_MAX_DEPTH } = params

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

    printLine({ text: nodePath.basename(path), depth: 0, prefixes: [] })

    await traverse(path, 1)

    printTreeStats(directories, files)

    async function traverse(path: string, depth: number = 0, prefixes: string[] = []) {
        const children = await getChildren(path)
        const lastIndex = children.length - 1

        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            const childPath = `${path}${nodePath.sep}${child}`

            const isParent = await checkIsParent(childPath)
            const isLastChild = i === lastIndex

            // Counting files and directories for stats
            if (isParent) {
                directories++
            } else {
                files++
            }

            const extendedPrefixes = [...prefixes]

            if (isLastChild) {
                extendedPrefixes.push('└── ')
            } else {
                extendedPrefixes.push('├── ')
            }

            printLine({ text: child, depth, prefixes: extendedPrefixes })

            if (
                depth >= maxDepth ||
                !isParent // only parents can be traversed
            ) {
                continue
            }

            const newLinePrefixes = [...prefixes]

            if (isLastChild) {
                newLinePrefixes.push('    ')
            } else {
                newLinePrefixes.push('│   ')
            }

            await traverse(childPath, depth + 1, newLinePrefixes)
        }
    }
}

function getParamsFromCLI(): TreeParams {
    const args = process.argv.slice(2)
    const path = args[0]

    let maxDepth = ['-d', '--depth'].includes(args[1]) && args[2] && Number(args[2])

    if (!maxDepth) {
        maxDepth = DEFAULT_MAX_DEPTH
    }

    return { path, maxDepth }
}

function getParamsFromEnv(): Partial<TreeParams> {
    const path = process.env.TREE_ROOT

    let maxDepth = Number(process.env.TREE_MAX_DEPTH)

    if (Number.isNaN(maxDepth)) {
        maxDepth = DEFAULT_MAX_DEPTH
    }

    return { path, maxDepth }
}

function getTreeParams() {
    const paramsFromCli = getParamsFromCLI()
    const paramsFromEnv = getParamsFromEnv()

    return {
        ...paramsFromEnv,
        ...paramsFromCli,
    }
}

async function checkIsParent(path: string) {
    const stats = await fs.stat(path)
    return stats.isDirectory()
}

async function checkIsChild(path: string) {
    const stats = await fs.stat(path)
    return stats.isFile()
}

function printLine({ text, depth, prefixes }: { text: string, depth: number, prefixes: string[] }) {
    const prefix = depth === 0
        ? ''
        : prefixes.join('')
    console.log(prefix + text)
}

async function getChildren(path: string) {
    return fs.readdir(path)
}

function printTreeStats(numberOfFolders: number, numberOfFiles: number) {
    console.log('\n')
    report(`Total folders: ${numberOfFolders}`)
    report(`Total files: ${numberOfFiles}`)
}


function report(message: string) {
    console.log('\x1b[1m\x1b[37m\x1b[40m%s\x1b[0m', `  ${message}  `)
}
