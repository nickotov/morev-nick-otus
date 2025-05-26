const MIN_PASSWORD_LENGTH = 8

export const passwordValidation = {
    validate: (value: string) => {
        return value.trim().length >= MIN_PASSWORD_LENGTH
    },
    message: () => {
        return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    }
}