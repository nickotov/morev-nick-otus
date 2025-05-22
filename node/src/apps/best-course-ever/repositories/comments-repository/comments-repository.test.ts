import { CommentsRepository } from './index'
import type { Comment } from './types'


describe('CommentsRepository', () => {
    let commentsRepository: CommentsRepository

    beforeEach(() => {
        commentsRepository = new CommentsRepository()
        jest.resetAllMocks()
    })

    describe('createComment', () => {
        test('should create and return a new comment', async () => {
            // Arrange
            const commentData: Omit<Comment, '_id'> = {
                courseId: 'course123',
                lessonId: 'lesson456',
                authorId: 'author789',
                text: 'This is a test comment'
            }

            // Act
            const result = await commentsRepository.createComment(commentData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            expect(result.data._id).toBeDefined()
            expect(result.data.courseId).toBe(commentData.courseId)
            expect(result.data.lessonId).toBe(commentData.lessonId)
            expect(result.data.authorId).toBe(commentData.authorId)
            expect(result.data.text).toBe(commentData.text)
        })
    })

    describe('getComments', () => {
        test('should return comments for a course', async () => {
            // Arrange
            const courseId = 'course123'

            // Act
            const result = await commentsRepository.getComments(courseId)

            // Assert
            expect(result.error).toBeNull()
            expect(Array.isArray(result.data)).toBe(true)
            if (result.data.length > 0) {
                result.data.forEach((comment) => {
                    expect(comment.courseId).toBe(courseId)
                })
            }
        })

        test('should return comments for a specific lesson', async () => {
            // Arrange
            const courseId = 'course123'
            const lessonId = 'lesson456'

            // Act
            const result = await commentsRepository.getComments(courseId, lessonId)

            // Assert
            expect(result.error).toBeNull()
            expect(Array.isArray(result.data)).toBe(true)
            if (result.data.length > 0) {
                result.data.forEach((comment) => {
                    expect(comment.courseId).toBe(courseId)
                    expect(comment.lessonId).toBe(lessonId)
                })
            }
        })
    })

    describe('getComment', () => {
        test('should return a specific comment by ID', async () => {
            // Arrange
            const commentId = 'comment123'

            // Act
            const result = await commentsRepository.getComment(commentId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            expect(result.data._id).toBe(commentId)
        })
    })

    describe('updateComment', () => {
        test('should update and return the updated comment', async () => {
            // Arrange
            const commentId = 'comment123'
            const updateData: Partial<Comment> = {
                text: 'Updated comment text'
            }

            // Act
            const result = await commentsRepository.updateComment(commentId, updateData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            expect(result.data._id).toBe(commentId)
            expect(result.data.text).toBe(updateData.text)
        })
    })

    describe('deleteComment', () => {
        test('should delete and return the deleted comment', async () => {
            // Arrange
            const commentId = 'comment123'

            // Act
            const result = await commentsRepository.deleteComment(commentId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            expect(result.data._id).toBe(commentId)
        })
    })
})
