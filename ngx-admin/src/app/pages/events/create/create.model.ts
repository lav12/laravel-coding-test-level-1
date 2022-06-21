export interface eventCreate {
    description: string;
    msg: string,
    response: {
        id: string,
        name: string,
        slug: string,
        startAt: string,
        endAt: string,
        created_at: Date,
        updated_at: Date
    },
    response_code: number
}
