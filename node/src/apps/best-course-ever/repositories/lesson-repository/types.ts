import type { Result, ExtraContent } from '../types'

export interface ILessonRepository {
    createLesson(data: Pick<Lesson, 'title' | 'description'>): Promise<Result<Lesson>>
    getLesson(id: string): Promise<Result<Lesson>>
    getLessons(query?: LessonsQuery): Promise<Result<Lesson[]>>
    updateLesson(id: string, data: Partial<Lesson>): Promise<Result<Lesson>>
    deleteLesson(id: string): Promise<Result<Lesson>>
}

type FeedbackId = string
type CommentId = string

export interface Lesson {
    _id: string
    courseId: string // id of the course that the lesson belongs to
    title: string
    description: string
    extraContent: ExtraContent[]
    video: Video | null
    comments: CommentId[]
    feedbacks: FeedbackId[]
}

export interface Video {
    _id: string
    source: string // link to the video
    title: string
}

export interface Comment {
    _id: string
    authorId: string // id of the user who wrote the comment
    text: string
}

export interface LessonsQuery {
    page?: number
    limit?: number
}
