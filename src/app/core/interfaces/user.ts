export interface User {
    email: string;
    displayName: string;
    directMessages: any[]; 
    avatarPath: string;
    isOnline: boolean;
    photoURL: string;
}

export const EMPTY_USER: User = {
    email: '',
    displayName: '',
    directMessages: [], 
    avatarPath: '',
    isOnline: false,
    photoURL: ''
} as const
