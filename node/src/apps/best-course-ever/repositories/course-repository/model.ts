import { Schema, model } from 'mongoose'
import { Course } from './types'
import {
    courseTitleValidation,
    courseDescriptionValidation
} from '@app/utils/validators'

const CourseSchema = new Schema<Course>({
    title: {
        type: String,
        required: true,
        validate: {
            validator: courseTitleValidation.validate,
            message: courseTitleValidation.message()
        }
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: courseDescriptionValidation.validate,
            message: courseDescriptionValidation.message()
        }
    },
    authorId: {
        type: String,
        ref: 'User',
        required: true
    },
    lessons: {
        type: [String],
        ref: 'Lesson',
        default: []
    },
    feedbacks: {
        type: [String],
        ref: 'Feedback',
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
})

// Remove all feedbacks associated with this course when course is deleted
CourseSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        try {
            // Remove all feedbacks associated with this course
            const { FeedbackModel } = await import('../feedback-repository/model.js')
            await FeedbackModel.deleteMany({ courseId: doc._id.toString() })
        } catch (error) {
            console.error('Error removing feedbacks when course deleted:', error)
        }
    }
})

export const CourseModel = model('Course', CourseSchema)
