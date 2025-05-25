import { CourseRepository } from './index'
import type { Course } from './types'


describe('CourseRepository', () => {
    let courseRepository: CourseRepository

    beforeEach(() => {
        courseRepository = new CourseRepository()
        jest.resetAllMocks()
    })

    describe('createCourse', () => {
        test('should create and return a new course', async () => {
            // Arrange
            const courseData = {
                title: 'Node.js Fundamentals',
                description: 'Learn the basics of Node.js'
            }

            // Act
            const result = await courseRepository.createCourse(courseData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Course data is null')
            }
            expect(result.data._id).toBeDefined()
            expect(result.data.title).toBe(courseData.title)
            expect(result.data.description).toBe(courseData.description)
            expect(result.data.authorId).toBeDefined()
            expect(Array.isArray(result.data.lessons)).toBe(true)
            expect(Array.isArray(result.data.feedbacks)).toBe(true)
            expect(Array.isArray(result.data.tags)).toBe(true)
            expect(Array.isArray(result.data.extraContent)).toBe(true)
            expect(['beginner', 'intermediate', 'advanced']).toContain(result.data.level)
        })
    })

    describe('getCourse', () => {
        test('should return a course by ID', async () => {
            // Arrange
            const courseId = '123456789'

            // Act
            const result = await courseRepository.getCourse(courseId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Course data is null')
            }
            expect(result.data._id).toBe(courseId)
        })
    })

    describe('updateCourse', () => {
        test('should update and return the updated course', async () => {
            // Arrange
            const courseId = '123456789'
            const updateData: Partial<Course> = {
                title: 'Updated Node.js Course',
                description: 'Updated course description',
                level: 'advanced'
            }

            // Act
            const result = await courseRepository.updateCourse(courseId, updateData)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Course data is null')
            }
            expect(result.data._id).toBe(courseId)
            expect(result.data.title).toBe(updateData.title)
            expect(result.data.description).toBe(updateData.description)
            expect(result.data.level).toBe(updateData.level)
        })
    })

    describe('deleteCourse', () => {
        test('should delete and return the deleted course', async () => {
            // Arrange
            const courseId = '123456789'

            // Act
            const result = await courseRepository.deleteCourse(courseId)

            // Assert
            expect(result.error).toBeNull()
            expect(result.data).toBeDefined()
            if (!result.data) {
                throw new Error('Course data is null')
            }
            expect(result.data._id).toBe(courseId)
        })
    })
})
