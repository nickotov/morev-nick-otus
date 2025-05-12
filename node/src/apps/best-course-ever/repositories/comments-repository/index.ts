import type { ICommentsRepository, Comment } from './types'
import { Result } from '../types'

export class CommentsRepository implements ICommentsRepository {
    async createComment(data: Omit<Comment, '_id'>): Promise<Result<Comment>> {
        throw new Error('Not implemented')
    }

    async getComments(courseId: string, lessonId?: string): Promise<Result<Comment[]>> {
        throw new Error('Not implemented')
    }

    async getComment(commentId: string): Promise<Result<Comment>> {
        throw new Error('Not implemented')
    }

    async updateComment(commentId: string, data: Partial<Comment>): Promise<Result<Comment>> {
        throw new Error('Not implemented')
    }

    async deleteComment(commentId: string): Promise<Result<Comment>> {
        throw new Error('Not implemented')
    }
}
