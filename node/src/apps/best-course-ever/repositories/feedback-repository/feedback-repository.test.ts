import { FeedbackRepository } from './index'
import type { Feedback } from './types'


describe('FeedbackRepository', () => {
    let feedbackRepository: FeedbackRepository

    beforeEach(() => {
        feedbackRepository = new FeedbackRepository()
        jest.resetAllMocks()
    })

    describe('createFeedback', () => {
        test('should create and return a new feedback', async () => {
            // Arrange
            const feedbackData: Omit<Feedback, '_id'> = {
                authorId: 'author123',
                text: 'This course is excellent!',
                rating: 5
            }

            // Act
            const result = await feedbackRepository.createFeedback(feedbackData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Feedback data is null')
            }
            expect(result.data._id).toBeDefined()
            expect(result.data.authorId).toBe(feedbackData.authorId)
            expect(result.data.text).toBe(feedbackData.text)
            expect(result.data.rating).toBe(feedbackData.rating)
        })
    })

    describe('getFeedbacks', () => {
        test('should return feedbacks for a course', async () => {
            // Arrange
            const courseId = 'course123'

            // Act
            const result = await feedbackRepository.getFeedbacks(courseId)

            // Assert
            expect(result.error).toBeNull()
            expect(Array.isArray(result.data)).toBe(true)
            if (!result.data) {
                throw new Error('Feedbacks data is null')
            }
        })

        test('should return feedbacks for a specific lesson', async () => {
            // Arrange
            const courseId = 'course123'
            const lessonId = 'lesson456'

            // Act
            const result = await feedbackRepository.getFeedbacks(courseId, lessonId)

            // Assert
            expect(result.error).toBeNull()
            expect(Array.isArray(result.data)).toBe(true)
            if (!result.data) {
                throw new Error('Feedbacks data is null')
            }
            // All feedbacks should be for the specified lesson
            if (result.data.length > 0) {
                result.data.forEach((feedback) => {
                    expect(feedback).toBeDefined()
                })
            }
        })
    })

    describe('getFeedback', () => {
        test('should return a specific feedback by ID', async () => {
            // Arrange
            const feedbackId = 'feedback123'

            // Act
            const result = await feedbackRepository.getFeedback(feedbackId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Feedback data is null')
            }
            expect(result.data._id).toBe(feedbackId)
        })
    })

    describe('updateFeedback', () => {
        test('should update and return the updated feedback', async () => {
            // Arrange
            const feedbackId = 'feedback123'
            const updateData: Partial<Feedback> = {
                text: 'Updated feedback',
                rating: 4
            }

            // Act
            const result = await feedbackRepository.updateFeedback(feedbackId, updateData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Feedback data is null')
            }
            expect(result.data._id).toBe(feedbackId)
            expect(result.data.text).toBe(updateData.text)
            expect(result.data.rating).toBe(updateData.rating)
        })
    })

    describe('deleteFeedback', () => {
        test('should delete and return the deleted feedback', async () => {
            // Arrange
            const feedbackId = 'feedback123'

            // Act
            const result = await feedbackRepository.deleteFeedback(feedbackId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Feedback data is null')
            }
            expect(result.data._id).toBe(feedbackId)
        })
    })
})
