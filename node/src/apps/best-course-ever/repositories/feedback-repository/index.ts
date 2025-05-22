import type { IFeedbackRepository, Feedback } from './types'
import { Result } from '../types'

export class FeedbackRepository implements IFeedbackRepository {
    async createFeedback(data: Omit<Feedback, '_id'>): Promise<Result<Feedback>> {
        throw new Error('Not implemented')
    }

    async getFeedbacks(courseId: string, lessonId?: string): Promise<Result<Feedback[]>> {
        throw new Error('Not implemented')
    }

    async getFeedback(feedbackId: string): Promise<Result<Feedback>> {
        throw new Error('Not implemented')
    }

    async updateFeedback(feedbackId: string, data: Partial<Feedback>): Promise<Result<Feedback>> {
        throw new Error('Not implemented')
    }

    async deleteFeedback(feedbackId: string): Promise<Result<Feedback>> {
        throw new Error('Not implemented')
    }
}
