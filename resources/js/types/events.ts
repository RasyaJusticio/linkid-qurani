export type BaseEvent = {
    method: "GET" | "POST" | "RESP";
    type: "initial_data" | 'route_change' | 'appearance_change';
    data: unknown;
}

export type InitialDataEvent = BaseEvent & {
    type: "initial_data";
    data: {
        user_id: number;
        language: 'id_ID' | 'en_US' | 'ra_RA';
        appearance: 'light' | 'dark';
        session: string;
    };
}

export type AppearanceChangeEvent = BaseEvent & {
    type: "appearance_change";
    data: {
        appearance: 'light' | 'dark';
    };
}


