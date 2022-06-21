export interface eventIndex {
    description: string;
    msg: string,
    response: {
        current_page: number,
        data: [],
        first_page_url: string,
        from: number,
        last_page: number,
        last_page_url: string,
        links: [],
        next_page_url: string,
        path: string,
        per_page: number,
        prev_page_url: string,
        to: number,
        total: number,
    },
    response_code: number
}


export interface eventShow {
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


export interface eventUpdate {
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

export interface eventDelete {
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