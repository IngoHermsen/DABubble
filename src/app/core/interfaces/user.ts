export class User {
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
    directMessages: any[]; 
    avatarPath: string;
    isOnline: boolean;

    constructor(user?: any) {
        this.uid = user.uid
        this.email = "";
        this.displayName = "";
        this.emailVerified = false;
        this.directMessages = []; 
        this.avatarPath = "";
        this.isOnline = false;
    }
}
