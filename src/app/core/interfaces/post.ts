export interface Post {
    postId: string;
    creatorId: string;
    text: string;
    reactions: []
    creationTime: Date
    isAnswer: boolean;
}
