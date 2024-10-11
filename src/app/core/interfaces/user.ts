export interface User {
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
    DirectMessages: any[] // 
    avatarPath: string;
    isOnline: boolean
}
