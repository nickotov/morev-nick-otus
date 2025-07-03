import type { ILessonRepository, Lesson, LessonsQuery } from './types'
import { Result } from '../types'
import { LessonModel } from './model'


export class LessonRepository implements ILessonRepository {
    async createLesson(data: Lesson): Promise<Result<Lesson>> {
        const lesson = await LessonModel.create(data)

        return {
            data: lesson,
            error: null
        }
    }

    async getLesson(id: string): Promise<Result<Lesson>> {
        const lesson = await LessonModel.findById(id)

        if (!lesson) {
            return {
                data: null,
                error: 'Lesson not found'
            }
        }

        return {
            data: lesson,
            error: null
        }
    }

    async getLessons(query?: LessonsQuery): Promise<Result<Lesson[]>> {
        const { page = 0, limit = 10 } = query || {}

        const lessons = await LessonModel.find({})
            .skip(page * limit)
            .limit(limit)
            .exec()

        return {
            data: lessons,
            error: null
        }
    }

    async updateLesson(id: string, data: Partial<Lesson>): Promise<Result<Lesson>> {
        const lesson = await LessonModel.findByIdAndUpdate(id, data, { new: true })

        if (!lesson) {
            return {
                data: null,
                error: 'Lesson not found'
            }
        }

        return {
            data: lesson,
            error: null
        }
    }

    async deleteLesson(id: string): Promise<Result<Lesson>> {
        const lesson = await LessonModel.findByIdAndDelete(id)

        if (!lesson) {
            return {
                data: null,
                error: 'Lesson not found'
            }
        }

        return {
            data: lesson,
            error: null
        }
    }
}
