export interface Note {
    id: string,
    name: string,
    content: string,
    background: string,
    created_at: Date,
    updated_at: Date
}

export interface Config {
    notes: Note[]
}