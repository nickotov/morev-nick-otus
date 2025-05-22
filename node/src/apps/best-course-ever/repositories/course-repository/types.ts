import type { Result, ExtraContent } from '../types'

export interface ICourseRepository {
    createCourse(data: Pick<Course, 'title' | 'description'>): Promise<Result<Course>>
    getCourse(id: string): Promise<Result<Course>>
    updateCourse(id: string, data: Partial<Course>): Promise<Result<Course>>
    deleteCourse(id: string): Promise<Result<Course>>
}

type LessonId = string
type FeedbackId = string
type Tag = string
type CourseLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Course {
    _id: string
    authorId: string // id of the user who created the course
    title: string
    description: string
    lessons: LessonId[]
    feedbacks: FeedbackId[]
    tags: Tag[]
    level: CourseLevel
    extraContent: ExtraContent[]
}
