export interface User {
    user_id: number;
    user_name: string;
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    [key: string]: unknown;
}
