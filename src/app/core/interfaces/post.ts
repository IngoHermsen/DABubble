export interface Post {
    postId: string;
    creatorId: string;
    text: string;
    reactions: []
    creationTime: string  // type 'string' for first test content, change later to type 'Date'
    isAnswer: boolean;
    imgPath?: string;
}
