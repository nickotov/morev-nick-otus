import { Result } from "../types"

export interface ICommentsRepository {
    createComment(data: Omit<Comment, '_id'>): Promise<Result<Comment>>
    getComments(courseId: string, lessonId?: string): Promise<Result<Comment[]>>
    getComment(commentId: string): Promise<Result<Comment>>
    updateComment(commentId: string, data: Partial<Comment>): Promise<Result<Comment>>
    deleteComment(commentId: string): Promise<Result<Comment>>
}

export interface Comment {
    _id: string
    lessonId?: string // id of the lesson that the comment belongs to
    courseId?: string // id of the course that the comment belongs to
    authorId: string // id of the user who wrote the comment
    text: string
}