import { CommentsRepository } from './index'
import type { Comment } from './types'


describe('CommentsRepository', () => {
    let commentsRepository: CommentsRepository

    beforeEach(() => {
        commentsRepository = new CommentsRepository()
        jest.resetAllMocks()
    })

    describe('createComment', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const commentData: Omit<Comment, '_id'> = {
                courseId: 'course123',
                lessonId: 'lesson456',
                authorId: 'author789',
                text: 'This is a test comment'
            }

            // Act & Assert
            await expect(commentsRepository.createComment(commentData)).rejects.toThrow(
                'Not implemented'
            )
        })
    })

    describe('getComments', () => {
        test('should throw not implemented error when getting comments for a course', async () => {
            // Arrange
            const courseId = 'course123'

            // Act & Assert
            await expect(commentsRepository.getComments(courseId)).rejects.toThrow(
                'Not implemented'
            )
        })

        test('should throw not implemented error when getting comments for a lesson', async () => {
            // Arrange
            const courseId = 'course123'
            const lessonId = 'lesson456'

            // Act & Assert
            await expect(commentsRepository.getComments(courseId, lessonId)).rejects.toThrow(
                'Not implemented'
            )
        })
    })

    describe('getComment', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const commentId = 'comment123'

            // Act & Assert
            await expect(commentsRepository.getComment(commentId)).rejects.toThrow(
                'Not implemented'
            )
        })
    })

    describe('updateComment', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const commentId = 'comment123'
            const updateData: Partial<Comment> = {
                text: 'Updated comment text'
            }

            // Act & Assert
            await expect(commentsRepository.updateComment(commentId, updateData)).rejects.toThrow(
                'Not implemented'
            )
        })
    })

    describe('deleteComment', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const commentId = 'comment123'

            // Act & Assert
            await expect(commentsRepository.deleteComment(commentId)).rejects.toThrow(
                'Not implemented'
            )
        })
    })
})
