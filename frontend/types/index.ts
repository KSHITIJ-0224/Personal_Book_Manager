export interface User {
    _id: string;
    name: string;
    email: string;
    token?: string;
}

export type BookStatus = "Want to Read" | "Reading" | "Completed";

export interface Book {
    _id: string;
    title: string;
    author: string;
    tags: string[];
    status: BookStatus;
    user: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}
