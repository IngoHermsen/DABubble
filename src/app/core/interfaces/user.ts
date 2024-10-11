export interface User {
    uid: string;
    // firstName: string;
    // lastName: string;
    initials: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
    DirectMessages: any[] // 
    avatarPath: string;
    isOnline: boolean
}
