import type { IFeedbackRepository, Feedback, FeedbacksQuery } from './types'
import { Result } from '../types'
import { FeedbackModel } from './model'

export class FeedbackRepository implements IFeedbackRepository {
    async createFeedback(data: Omit<Feedback, '_id'>): Promise<Result<Feedback>> {
        try {
            const feedback = new FeedbackModel(data)
            await feedback.save()
            return { data: feedback.toObject(), error: null }
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            }
        }
    }

    async getFeedbacks(courseId?: string, lessonId?: string, query?: FeedbacksQuery): Promise<Result<Feedback[]>> {
        try {
            const { page = 0, limit = 10 } = query || {}

            const filter: any = {}
            if (courseId) {
                filter.courseId = courseId
            }
            if (lessonId) {
                filter.lessonId = lessonId
            }

            const feedbacks = await FeedbackModel.find(filter)
                // .sort({ createdAt: -1 })
                .skip(page * limit)
                .limit(limit)
                .exec()

            return { data: feedbacks.map(f => f.toObject()), error: null }
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            }
        }
    }

    async getFeedback(feedbackId: string): Promise<Result<Feedback>> {
        try {
            const feedback = await FeedbackModel.findById(feedbackId)
            if (!feedback) {
                return { data: null, error: 'Feedback not found' }
            }
            return { data: feedback.toObject(), error: null }
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            }
        }
    }

    async updateFeedback(feedbackId: string, data: Partial<Feedback>): Promise<Result<Feedback>> {
        try {
            const feedback = await FeedbackModel.findByIdAndUpdate(
                feedbackId,
                data,
                { new: true, runValidators: true }
            )
            if (!feedback) {
                return { data: null, error: 'Feedback not found' }
            }
            return { data: feedback.toObject(), error: null }
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            }
        }
    }

    async deleteFeedback(feedbackId: string): Promise<Result<Feedback>> {
        try {
            const feedback = await FeedbackModel.findByIdAndDelete(feedbackId)
            if (!feedback) {
                return { data: null, error: 'Feedback not found' }
            }
            return { data: feedback.toObject(), error: null }
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            }
        }
    }
}
