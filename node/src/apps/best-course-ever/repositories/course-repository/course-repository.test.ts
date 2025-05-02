import { CourseRepository } from './index'
import type { Course } from './types'


describe('CourseRepository', () => {
    let courseRepository: CourseRepository

    beforeEach(() => {
        courseRepository = new CourseRepository()
        jest.resetAllMocks()
    })

    describe('createCourse', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const courseData = {
                title: 'Node.js Fundamentals',
                description: 'Learn the basics of Node.js'
            }

            // Act & Assert
            await expect(courseRepository.createCourse(courseData)).rejects.toThrow(
                'Not implemented'
            )
        })
    })

    describe('getCourse', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const courseId = '123456789'

            // Act & Assert
            await expect(courseRepository.getCourse(courseId)).rejects.toThrow('Not implemented')
        })
    })

    describe('updateCourse', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const courseId = '123456789'
            const updateData: Partial<Course> = {
                title: 'Updated Node.js Course',
                description: 'Updated course description'
            }

            // Act & Assert
            await expect(courseRepository.updateCourse(courseId, updateData)).rejects.toThrow(
                'Not implemented'
            )
        })
    })

    describe('deleteCourse', () => {
        test('should throw not implemented error', async () => {
            // Arrange
            const courseId = '123456789'

            // Act & Assert
            await expect(courseRepository.deleteCourse(courseId)).rejects.toThrow('Not implemented')
        })
    })
})
