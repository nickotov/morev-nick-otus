export interface Result<T> {
    data: T
    error: string | null
}

export interface ExtraContent {
    _id: string
    source: string // link to the file
    title: string
    description?: string
}

