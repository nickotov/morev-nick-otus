import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { tree } from '@/utils/tree'


describe('tree utility', () => {
    let consoleLogMock: jest.SpyInstance
    let consoleOutput: string[] = []
    let tempDir: string

    beforeEach(async () => {
        // Create temp directory for tests
        tempDir = await mkdtemp(join(tmpdir(), 'tree-test-'))

        // Clear output array
        consoleOutput = []

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

    afterEach(async () => {
        // Clean up
        consoleLogMock.mockRestore()
        await rm(tempDir, { recursive: true, force: true })
    })

    test('should correctly display a simple directory structure', async () => {
        // Create test structure
        const file1Path = join(tempDir, 'file1.txt')
        const file2Path = join(tempDir, 'file2.txt')
        const folderPath = join(tempDir, 'folder1')
        const nestedFilePath = join(folderPath, 'nested-file.txt')

        await writeFile(file1Path, 'file1 content')
        await writeFile(file2Path, 'file2 content')
        await mkdir(folderPath)
        await writeFile(nestedFilePath, 'nested file content')

        // Run tree on our temp directory
        await tree({ path: tempDir })

        // Verify output structure
        const dirName = tempDir.split('/').pop() || 'tree-test'

        expect(consoleOutput[0]).toBe(dirName)
        expect(consoleOutput).toContain('├── file1.txt')
        expect(consoleOutput).toContain('├── file2.txt')
        expect(consoleOutput).toContain('└── folder1')
        expect(consoleOutput).toContain('    └── nested-file.txt')

        // Verify stats - must match the exact text
        expect(consoleOutput).toContain('  Total folders: 1  ')
        expect(consoleOutput).toContain('  Total files: 3  ')
    })

    test('should respect maxDepth parameter', async () => {
        // Create test structure with nested folders
        const file1Path = join(tempDir, 'file1.txt')
        const folderPath = join(tempDir, 'folder1')
        const nestedFilePath = join(folderPath, 'nested-file.txt')
        const nestedFolderPath = join(folderPath, 'nested-folder')
        const deeplyNestedFilePath = join(nestedFolderPath, 'deeply-nested.txt')

        await writeFile(file1Path, 'file1 content')
        await mkdir(folderPath)
        await writeFile(nestedFilePath, 'nested file content')
        await mkdir(nestedFolderPath)
        await writeFile(deeplyNestedFilePath, 'deeply nested content')

        // Run tree with maxDepth=1
        await tree({ path: tempDir, maxDepth: 1 })

        // Verify output structure
        const dirName = tempDir.split('/').pop() || 'tree-test'

        expect(consoleOutput[0]).toBe(dirName)
        expect(consoleOutput).toContain('├── file1.txt')
        expect(consoleOutput).toContain('└── folder1')

        // Verify that nested items are not in the output
        const outputStr = consoleOutput.join('\n')
        expect(outputStr).not.toContain('nested-file.txt')
        expect(outputStr).not.toContain('nested-folder')
        expect(outputStr).not.toContain('deeply-nested.txt')

        // Count stats - should only count visible items
        expect(consoleOutput).toContain('  Total folders: 1  ')
        expect(consoleOutput).toContain('  Total files: 1  ')
    })

    test('should handle a single file', async () => {
        // Create a single file
        const filePath = join(tempDir, 'single-file.txt')
        await writeFile(filePath, 'file content')

        // Run tree on the file directly
        await tree({ path: filePath })

        // Should only show stats, no tree structure
        expect(consoleOutput).toContain('  Total folders: 0  ')
        expect(consoleOutput).toContain('  Total files: 1  ')
    })

    test.todo('should throw error for invalid path')
    /**
     * 'should throw error for invalid path',
        // Using a path that doesn't exist
        // const invalidPath = join(tempDir, 'some-invalid-path')

        // expect.assertions(1)

        // try {
        //     await tree({ path: invalidPath })
        // } catch (error: any) {
        //     expect(error.message).toMatch(/Path is not valid/)
        // }
     */
})
