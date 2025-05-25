export const passwordValidation = {
    minLength: 8,
    validate(value: string) {
        return value.trim().length >= this.minLength
    },
    message() {
        return `Password must be at least ${this.minLength} characters long`
    }
}