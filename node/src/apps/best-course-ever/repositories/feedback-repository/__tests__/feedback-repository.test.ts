import { FeedbackRepository } from '../index'
import type { Feedback } from '../types'
import type { Result } from '../../types'

describe('FeedbackRepository', () => {
    let feedbackRepository: FeedbackRepository

    beforeEach(() => {
        feedbackRepository = new FeedbackRepository()
        jest.resetAllMocks()
    })

    describe('createFeedback', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const feedbackData: Omit<Feedback, '_id'> = {
                authorId: 'author123',
                text: 'This course is excellent!',
                rating: 5
            }

            // Act & Assert
            await expect(feedbackRepository.createFeedback(feedbackData)).rejects.toThrow(
                'Not implemented'
            )
        })
    })

    describe('getFeedbacks', () => {
        test('should throw not implemented error when getting feedbacks for a course', async () => {
            // Arrange
            const courseId = 'course123'

            // Act & Assert
            await expect(feedbackRepository.getFeedbacks(courseId)).rejects.toThrow(
                'Not implemented'
            )
        })

        test('should throw not implemented error when getting feedbacks for a lesson', async () => {
            // Arrange
            const courseId = 'course123'
            const lessonId = 'lesson456'

            // Act & Assert
            await expect(feedbackRepository.getFeedbacks(courseId, lessonId)).rejects.toThrow(
                'Not implemented'
            )
        })
    })

    describe('getFeedback', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const feedbackId = 'feedback123'

            // Act & Assert
            await expect(feedbackRepository.getFeedback(feedbackId)).rejects.toThrow(
                'Not implemented'
            )
        })
    })

    describe('updateFeedback', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const feedbackId = 'feedback123'
            const updateData: Partial<Feedback> = {
                text: 'Updated feedback',
                rating: 4
            }

            // Act & Assert
            await expect(feedbackRepository.updateFeedback(feedbackId, updateData)).rejects.toThrow(
                'Not implemented'
            )
        })
    })

    describe('deleteFeedback', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const feedbackId = 'feedback123'

            // Act & Assert
            await expect(feedbackRepository.deleteFeedback(feedbackId)).rejects.toThrow(
                'Not implemented'
            )
        })
    })
})
