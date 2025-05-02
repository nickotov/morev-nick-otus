import type { ICourseRepository, Course } from './types'
import { Result } from '../types'


export class CourseRepository implements ICourseRepository {
    async createCourse(data: Pick<Course, 'title' | 'description'>): Promise<Result<Course>> {
        throw new Error('Not implemented')
    }

    async getCourse(id: string): Promise<Result<Course>> {
        throw new Error('Not implemented')
    }

    async updateCourse(id: string, data: Partial<Course>): Promise<Result<Course>> {
        throw new Error('Not implemented')
    }

    async deleteCourse(id: string): Promise<Result<Course>> {
        throw new Error('Not implemented')
    }
}