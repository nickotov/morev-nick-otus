import { Schema, model } from 'mongoose'
import type { Lesson } from './types'
import { CourseModel } from '../course-repository/model'

const lessonSchema = new Schema<Lesson>({
    courseId: {
        type: String,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    extraContent: {
        type: [Object],
        properties: {
            source: String,
            title: String,
            description: String
        },
        default: []
    },
    video: {
        type: Object,
        properties: {
            source: String,
            title: String
        }
    },
    comments: {
        type: [String],
        ref: 'Comment',
        default: []
    },
    feedbacks: {
        type: [String],
        ref: 'Feedback',
        default: []
    },
})

lessonSchema.pre('save', async function (next) {
    const courseId = this.courseId
    const course = await CourseModel.findById(courseId)

    if (!course) {
        return next(new Error('Course not found'))
    }

    course.lessons.push(this._id)
    await course.save()
})

lessonSchema.post('findOneAndDelete', async function (doc, next) {
    const courseId = doc.courseId
    const course = await CourseModel.findById(courseId)

    if (!course) {
        return next(new Error('Course not found'))
    }

    course.lessons = course.lessons.filter((lesson) => lesson !== doc._id.toString())
    await course.save()
})


export const LessonModel = model('Lesson', lessonSchema)