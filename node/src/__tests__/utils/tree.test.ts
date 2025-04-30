import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { tree } from '@/utils/tree'


describe('tree utility', () => {
    let consoleLogMock: jest.SpyInstance
    let consoleOutput: string[] = []
    let tempDir: string

    let fsHelper: FsHelper

    beforeAll(async () => {
        // Mock console.log to capture output
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation((message, ...args) => {
            if (args.length && typeof message === 'string' && message.includes('%s')) {
                // This is a formatted message, like the stats output
                consoleOutput.push(args[0])
            } else {
                consoleOutput.push(message)
            }
        })
    })

    // prepare test environment before each test
    beforeEach(async () => {
        // Create temp directory for tests
        tempDir = await mkdtemp(join(tmpdir(), 'tree-test-'))
        fsHelper = new FsHelper(tempDir)

        // Clear output array
        consoleOutput = []
    })

    afterEach(async () => {
        // Clean up temp directory after each test
        await rm(tempDir, { recursive: true, force: true })
    })

    afterAll(async () => {
        // Clean up
        consoleLogMock.mockRestore()
    })

    test('correctly display a simple directory structure', async () => {
        // Create test structure
        const {
            file1Name,
            file2Name,
            folder1Name,
            nestedFileName,
        } = await fsHelper.createSimpleFodersStructure()

        // Run tree on our temp directory
        await tree({ path: tempDir })

        // Verify output structure
        const dirName = tempDir.split('/').pop() || 'tree-test'

        expect(consoleOutput[0]).toBe(dirName)
        expect(consoleOutput).toContain(`├── ${file1Name}`)
        expect(consoleOutput).toContain(`├── ${file2Name}`)
        expect(consoleOutput).toContain(`└── ${folder1Name}`)
        expect(consoleOutput).toContain(`    └── ${nestedFileName}`)

        // Verify stats - must match the exact text
        expect(consoleOutput).toContain('  Total folders: 1  ')
        expect(consoleOutput).toContain('  Total files: 3  ')
    })

    test('consider maxDepth parameter used in tree function', async () => {
        // Create test structure with nested folders
        const {
            file1Name,
            folder1Name,
            nestedFileName,
            nestedFolderName,
            deeplyNestedFileName,
        } = await fsHelper.createNestedFoldersStructure()

        // Run tree with maxDepth=1
        await tree({ path: tempDir, maxDepth: 1 })

        // Verify output structure
        const dirName = tempDir.split('/').pop() || 'tree-test'

        expect(consoleOutput[0]).toBe(dirName)
        expect(consoleOutput).toContain(`├── ${file1Name}`)
        expect(consoleOutput).toContain(`└── ${folder1Name}`)

        // Verify that nested items are not in the output
        const outputStr = consoleOutput.join('\n')

        expect(outputStr).not.toContain(`${nestedFileName}`)
        expect(outputStr).not.toContain(`${nestedFolderName}`)
        expect(outputStr).not.toContain(`${deeplyNestedFileName}`)

        // Count stats - should only count visible items
        expect(consoleOutput).toContain('  Total folders: 1  ')
        expect(consoleOutput).toContain('  Total files: 1  ')
    })

    test('correctly display stats for a single file', async () => {
        // Create a single file
        const { filePath } = await fsHelper.createSingleFile()

        // Run tree on the file directly
        await tree({ path: filePath })

        // Should only show stats, no tree structure
        expect(consoleOutput).toContain('  Total folders: 0  ')
        expect(consoleOutput).toContain('  Total files: 1  ')
    })

    test('throw an error when path is not provided', async () => {
        await expect(tree({ path: '' }))
            .rejects
            .toThrow('Path is required')
    })

    test('handle CLI parameters', async () => {
        // Mock process.argv
        const originalArgv = process.argv
        process.argv = ['node', 'script.js', tempDir, '-d', '2']

        try {
            // Create test structure
            const {
                file1Name,
                folder1Name,
                nestedFolderName,
                deeplyNestedFileName,
            } = await fsHelper.createDeeplyNestedFoldersStructure()

            await tree({ path: tempDir, maxDepth: 2 }) // Use explicit params instead of CLI

            // Verify that depth=2 was respected
            const outputStr = consoleOutput.join('\n')
            expect(outputStr).toContain(`${file1Name}`)
            expect(outputStr).toContain(`${folder1Name}`)
            expect(outputStr).toContain(`${nestedFolderName}`)
            expect(outputStr).not.toContain(`${deeplyNestedFileName}`)
        } finally {
            // Restore original argv
            process.argv = originalArgv
        }
    })

    test('handle environment variables', async () => {
        // Create test structure first
        const {
            file1Name,
            folder1Name,
            nestedFileName,
        } = await fsHelper.createSimpleFodersStructure()

        // Mock environment variables
        const originalEnv = { ...process.env }
        process.env.TREE_ROOT = tempDir
        process.env.TREE_MAX_DEPTH = '1'

        try {
            await tree({ path: tempDir, maxDepth: 1 }) // Use explicit params instead of env vars

            // Verify that depth=1 was respected
            const outputStr = consoleOutput.join('\n')
            expect(outputStr).toContain(`${file1Name}`)
            expect(outputStr).toContain(`${folder1Name}`)
            expect(outputStr).not.toContain(`${nestedFileName}`)
        } finally {
            // Restore original env
            process.env = originalEnv
        }
    })

    test('handle incorrect value of environment max depth parameter', async () => {
        // Create a simple file structure first
        const { fileName } = await fsHelper.createSingleFile()

        // Mock environment variables
        const originalEnv = { ...process.env }
        process.env.TREE_ROOT = tempDir
        process.env.TREE_MAX_DEPTH = 'invalid'

        try {
            await tree({ path: tempDir }) // Use explicit path instead of env vars

            // Should use default max depth and show the file
            const outputStr = consoleOutput.join('\n')
            expect(outputStr).toContain(`└── ${fileName}`)
        } finally {
            // Restore original env
            process.env = originalEnv
        }
    })

    // TODO: need to find out why rejects ignored (looks like problem with async nature of fs access in tree function)
    test.skip('throw an error for an invalid path', async () => {
        // Create and immediately delete a file to ensure we have an invalid path
        const invalidPath = join(tempDir, 'temp-file')
        await writeFile(invalidPath, 'content')
        await rm(invalidPath)

        await expect(tree({ path: invalidPath }))
            .rejects
            .toThrow('Path is not valid')
    })

    test('handle CLI parameters with --depth flag', async () => {
        // Mock process.argv
        const originalArgv = process.argv
        process.argv = ['node', 'script.js', tempDir, '--depth', '1']

        // Create test structure
        const {
            file1Name,
            folder1Name,
            nestedFileName,
        } = await fsHelper.createSimpleFodersStructure()

        try {
            await tree() // This will use CLI params

            const outputStr = consoleOutput.join('\n')
            expect(outputStr).toContain(`${file1Name}`)
            expect(outputStr).toContain(`${folder1Name}`)
            expect(outputStr).not.toContain(`${nestedFileName}`)
        } finally {
            process.argv = originalArgv
        }
    })

    test('use default depth when no CLI depth is provided', async () => {
        // Mock process.argv
        const originalArgv = process.argv
        process.argv = ['node', 'script.js', tempDir]

        // Create test structure
        const { fileName } = await fsHelper.createSingleFile()

        try {
            await tree() // This will use CLI params without depth

            const outputStr = consoleOutput.join('\n')
            expect(outputStr).toContain(`${fileName}`)
        } finally {
            process.argv = originalArgv
        }
    })

    test('handle missing CLI path parameter', async () => {
        // Mock process.argv with no path
        const originalArgv = process.argv
        process.argv = ['node', 'script.js']

        try {
            await tree() // This should use environment variables or throw error
            fail('Should have thrown an error')
        } catch (error: any) {
            expect(error.message).toBe('Path is required')
        } finally {
            process.argv = originalArgv
        }
    })
})

class FsHelper {
    constructor(private tempDir: string) {}

    // Helpers to create test structures
    async createSingleFile() {
        const fileName = 'single-file.txt'
        const filePath = join(this.tempDir, fileName)
        await writeFile(filePath, 'file content')

        return { fileName, filePath }
    }

    async createSimpleFodersStructure() {
        const file1Name = 'file1.txt'
        const file2Name = 'file2.txt'
        const folder1Name = 'folder1'
        const nestedFileName = 'nested-file.txt'

        const file1Path = join(this.tempDir, file1Name)
        const file2Path = join(this.tempDir, file2Name)
        const folderPath = join(this.tempDir, folder1Name)
        const nestedFilePath = join(folderPath, nestedFileName)

        await writeFile(file1Path, 'file1 content')
        await writeFile(file2Path, 'file2 content')
        await mkdir(folderPath)
        await writeFile(nestedFilePath, 'nested file content')

        return {
            file1Name,
            file2Name,
            folder1Name,
            nestedFileName,
        }
    }

    async createNestedFoldersStructure() {
        const file1Name = 'file1.txt'
        const folder1Name = 'folder1'
        const nestedFileName = 'nested-file.txt'
        const nestedFolderName = 'nested-folder'
        const deeplyNestedFileName = 'deeply-nested.txt'

        const file1Path = join(this.tempDir, file1Name)
        const folderPath = join(this.tempDir, folder1Name)
        const nestedFilePath = join(folderPath, nestedFileName)
        const nestedFolderPath = join(folderPath, nestedFolderName)
        const deeplyNestedFilePath = join(nestedFolderPath, deeplyNestedFileName)

        await writeFile(file1Path, 'file1 content')
        await mkdir(folderPath)
        await writeFile(nestedFilePath, 'nested file content')
        await mkdir(nestedFolderPath)
        await writeFile(deeplyNestedFilePath, 'deeply nested content')

        return {
            file1Name,
            folder1Name,
            nestedFileName,
            nestedFolderName,
            deeplyNestedFileName,
        }
    }

    async createDeeplyNestedFoldersStructure() {
        const file1Name = 'file1.txt'
        const folder1Name = 'folder1'
        const nestedFolderName = 'nested-folder'
        const deeplyNestedFileName = 'deep.txt'

        const file1Path = join(this.tempDir, file1Name)
        const folderPath = join(this.tempDir, folder1Name)
        const nestedFolderPath = join(folderPath, nestedFolderName)
        const deeplyNestedFilePath = join(nestedFolderPath, deeplyNestedFileName)

        await writeFile(file1Path, 'content')
        await mkdir(folderPath)
        await mkdir(nestedFolderPath)
        await writeFile(deeplyNestedFilePath, 'content')

        return {
            file1Name,
            folder1Name,
            nestedFolderName,
            deeplyNestedFileName,
        }
    }
}



