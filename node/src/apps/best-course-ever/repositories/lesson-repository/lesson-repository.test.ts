import { LessonRepository } from './index'
import type { Lesson, Comment } from './types'


describe('LessonRepository', () => {
    let lessonRepository: LessonRepository

    beforeEach(() => {
        lessonRepository = new LessonRepository()
        jest.resetAllMocks()
    })

    describe('createLesson', () => {
        test('should create and return a new lesson', async () => {
            // Arrange
            const lessonData = {
                title: 'Introduction to Node.js',
                description: 'Learn the basics of Node.js'
            }

            // Act
            const result = await lessonRepository.createLesson(lessonData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Lesson data is null')
            }
            expect(result.data._id).toBeDefined()
            expect(result.data.title).toBe(lessonData.title)
            expect(result.data.description).toBe(lessonData.description)
            expect(result.data.courseId).toBeDefined()
            expect(Array.isArray(result.data.extraContent)).toBe(true)
            expect(Array.isArray(result.data.comments)).toBe(true)
            expect(Array.isArray(result.data.feedbacks)).toBe(true)
            expect(result.data.video).toBeDefined()
        })
    })

    describe('getLesson', () => {
        test('should return a lesson by ID', async () => {
            // Arrange
            const lessonId = 'lesson123'

            // Act
            const result = await lessonRepository.getLesson(lessonId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Lesson data is null')
            }
            expect(result.data._id).toBe(lessonId)
        })
    })

    describe('updateLesson', () => {
        test('should update and return the updated lesson', async () => {
            // Arrange
            const lessonId = 'lesson123'
            const updateData: Partial<Lesson> = {
                title: 'Updated Node.js Lesson',
                description: 'Updated lesson description'
            }

            // Act
            const result = await lessonRepository.updateLesson(lessonId, updateData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Lesson data is null')
            }
            expect(result.data._id).toBe(lessonId)
            expect(result.data.title).toBe(updateData.title)
            expect(result.data.description).toBe(updateData.description)
        })
    })

    describe('deleteLesson', () => {
        test('should delete and return the deleted lesson', async () => {
            // Arrange
            const lessonId = 'lesson123'

            // Act
            const result = await lessonRepository.deleteLesson(lessonId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Lesson data is null')
            }
            expect(result.data._id).toBe(lessonId)
        })
    })

    describe('createComment', () => {
        test('should create and return a new comment for a lesson', async () => {
            // Arrange
            const lessonId = 'lesson123'
            const commentData = {
                text: 'This is a test comment',
                authorId: 'author456'
            }

            // Act
            const result = await lessonRepository.createComment(lessonId, commentData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Comment data is null')
            }
            expect(result.data._id).toBeDefined()
            expect(result.data.text).toBe(commentData.text)
            expect(result.data.authorId).toBe(commentData.authorId)
        })
    })

    describe('getComments', () => {
        test('should return all comments for a lesson', async () => {
            // Arrange
            const lessonId = 'lesson123'

            // Act
            const result = await lessonRepository.getComments(lessonId)

            // Assert
            expect(result.error).toBeNull()
            expect(Array.isArray(result.data)).toBe(true)
        })
    })

    describe('getComment', () => {
        test('should return a specific comment for a lesson', async () => {
            // Arrange
            const lessonId = 'lesson123'
            const commentId = 'comment456'

            // Act
            const result = await lessonRepository.getComment(lessonId, commentId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Comment data is null')
            }
            expect(result.data._id).toBe(commentId)
        })
    })

    describe('updateComment', () => {
        test('should update and return the updated comment for a lesson', async () => {
            // Arrange
            const lessonId = 'lesson123'
            const commentId = 'comment456'
            const updateData: Partial<Comment> = {
                text: 'Updated comment text'
            }

            // Act
            const result = await lessonRepository.updateComment(lessonId, commentId, updateData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Comment data is null')
            }
            expect(result.data._id).toBe(commentId)
            expect(result.data.text).toBe(updateData.text)
        })
    })

    describe('deleteComment', () => {
        test('should delete and return the deleted comment for a lesson', async () => {
            // Arrange
            const lessonId = 'lesson123'
            const commentId = 'comment456'

            // Act
            const result = await lessonRepository.deleteComment(lessonId, commentId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Comment data is null')
            }
            expect(result.data._id).toBe(commentId)
        })
    })
})
