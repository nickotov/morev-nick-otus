import { Schema, model } from 'mongoose'
import type { Feedback } from './types'
import { LessonModel } from '../lesson-repository/model'
import { CourseModel } from '../course-repository/model'


const feedbackSchema = new Schema<Feedback>({
    authorId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    courseId: {
        type: String,
        ref: 'Course',
        required: true
    },
    lessonId: {
        type: String,
        ref: 'Lesson'
    }
}, {
    timestamps: true
})

// Add feedback ID to lesson's or course's feedback array when feedback is saved
feedbackSchema.pre('save', async function (next) {
    if (!this.isNew) {
        next()
        return
    }

    try {
        if (this.lessonId) {
            // Add to lesson if lessonId is provided
            const lesson = await LessonModel.findById(this.lessonId)
            if (!lesson) {
                return next(new Error('Lesson not found'))
            }
            lesson.feedbacks.push(this._id.toString())
            await lesson.save()
        } else {
            // Add to course if only courseId is provided
            const course = await CourseModel.findById(this.courseId)
            if (!course) {
                return next(new Error('Course not found'))
            }
            course.feedbacks.push(this._id.toString())
            await course.save()
        }
        next()
    } catch (error) {
        return next(error as Error)
    }
})

// Remove feedback reference from lesson or course when feedback is deleted
feedbackSchema.post('findOneAndDelete', async function (doc) {
    if (!doc) {
        return
    }

    try {
        if (doc.lessonId) {
            // Remove from lesson
            const lesson = await LessonModel.findById(doc.lessonId)
            if (lesson) {
                lesson.feedbacks = lesson.feedbacks.filter(
                    (feedbackId) => feedbackId !== doc._id.toString()
                )
                await lesson.save()
            }
        } else {
            // Remove from course
            const course = await CourseModel.findById(doc.courseId)
            if (course) {
                course.feedbacks = course.feedbacks.filter(
                    (feedbackId) => feedbackId !== doc._id.toString()
                )
                await course.save()
            }
        }
    } catch (error) {
        console.error('Error removing feedback reference:', error)
    }
})

export const FeedbackModel = model('Feedback', feedbackSchema)
