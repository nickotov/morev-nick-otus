import type { ILessonRepository, Lesson, Comment, Video } from './types'
import { Result } from '../types'

export class LessonRepository implements ILessonRepository {
    async createLesson(data: Pick<Lesson, 'title' | 'description'>): Promise<Result<Lesson>> {
        throw new Error('Not implemented')
    }

    async getLesson(id: string): Promise<Result<Lesson>> {
        throw new Error('Not implemented')
    }

    async updateLesson(id: string, data: Partial<Lesson>): Promise<Result<Lesson>> {
        throw new Error('Not implemented')
    }

    async deleteLesson(id: string): Promise<Result<Lesson>> {
        throw new Error('Not implemented')
    }

    async createComment(
        lessonId: string,
        data: Pick<Comment, 'text' | 'authorId'>
    ): Promise<Result<Comment>> {
        throw new Error('Not implemented')
    }

    async getComments(lessonId: string): Promise<Result<Comment[]>> {
        throw new Error('Not implemented')
    }

    async getComment(lessonId: string, commentId: string): Promise<Result<Comment>> {
        throw new Error('Not implemented')
    }

    async updateComment(
        lessonId: string,
        commentId: string,
        data: Partial<Comment>
    ): Promise<Result<Comment>> {
        throw new Error('Not implemented')
    }

    async deleteComment(lessonId: string, commentId: string): Promise<Result<Comment>> {
        throw new Error('Not implemented')
    }
}
