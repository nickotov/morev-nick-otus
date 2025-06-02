import type { ICourseRepository, Course, CourseQuery } from './types'
import { CourseModel } from './model'
import { Result } from '../types'

export class CourseRepository implements ICourseRepository {
    async createCourse(data: Pick<Course, 'title' | 'description'>): Promise<Result<Course>> {
        const course = await CourseModel.create(data)

        return {
            data: course,
            error: null
        }
    }

    async getCourses(query: CourseQuery): Promise<Result<Course[]>> {
        const { authorId, page = 0, limit = 10 } = query

        const courses = await CourseModel.find({ authorId })
            .skip(page * limit)
            .limit(limit)
            .exec()

        return {
            data: courses,
            error: null
        }
    }

    async getCourse(id: string): Promise<Result<Course>> {
        const course = await CourseModel.findById(id)

        if (!course) {
            return {
                data: null,
                error: 'Course not found'
            }
        }

        return {
            data: course,
            error: null
        }
    }

    async updateCourse(id: string, data: Partial<Course>): Promise<Result<Course>> {
        const course = await CourseModel.findByIdAndUpdate(id, data, { new: true })

        if (!course) {
            return {
                data: null,
                error: 'Course not found'
            }
        }

        return {
            data: course,
            error: null
        }
    }

    async deleteCourse(id: string): Promise<Result<Course>> {
        const course = await CourseModel.findByIdAndDelete(id)

        if (!course) {
            return {
                data: null,
                error: 'Course not found'
            }
        }

        return {
            data: course,
            error: null
        }
    }
}
