import { Result } from '../types'

export interface IFeedbackRepository {
    createFeedback(data: Omit<Feedback, '_id'>): Promise<Result<Feedback>>
    getFeedbacks(courseId?: string, lessonId?: string, query?: FeedbacksQuery): Promise<Result<Feedback[]>>
    getFeedback(feedbackId: string): Promise<Result<Feedback>>
    updateFeedback(feedbackId: string, data: Partial<Feedback>): Promise<Result<Feedback>>
    deleteFeedback(feedbackId: string): Promise<Result<Feedback>>
}

export interface Feedback {
    _id: string
    authorId: string // id of the user who wrote the feedback
    text: string
    rating: number
    courseId: string // id of the course that the feedback belongs to
    lessonId?: string // id of the lesson that the feedback belongs to (optional)
}

export interface FeedbacksQuery {
    page?: number
    limit?: number
}
