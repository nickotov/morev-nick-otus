const MIN_PASSWORD_LENGTH = 8

const MIN_COURSE_TITLE_LENGTH = 10
const MAX_COURSE_TITLE_LENGTH = 100

const MIN_COURSE_DESCRIPTION_LENGTH = 100
const MAX_COURSE_DESCRIPTION_LENGTH = 5_000

export const passwordValidation = {
    validate: (value: string) => {
        return value.trim().length >= MIN_PASSWORD_LENGTH
    },
    message: () => {
        return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    }
}

export const courseTitleValidation = {
    validate: (value: string) => {
        return value.trim().length >= MIN_COURSE_TITLE_LENGTH && value.trim().length <= MAX_COURSE_TITLE_LENGTH
    },
    message: () => {
        return `Title must be between ${MIN_COURSE_TITLE_LENGTH} and ${MAX_COURSE_TITLE_LENGTH} characters long`
    }
}

export const courseDescriptionValidation = {
    validate: (value: string) => {
        return value.trim().length >= MIN_COURSE_DESCRIPTION_LENGTH && value.trim().length <= MAX_COURSE_DESCRIPTION_LENGTH
    },
    message: () => {
        return `Description must be between ${MIN_COURSE_DESCRIPTION_LENGTH} and ${MAX_COURSE_DESCRIPTION_LENGTH} characters long`
    }
}