export interface Post {
    postId: string;
    creatorId: string;
    text: string;
    reactions: any[]
    creationTime: string  // 'string' allowed for first test content, change later to type 'Date'
    isAnswer: boolean;
    imgPath?: string;
}
