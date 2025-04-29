import { Timestamp } from "firebase/firestore";

export interface Post {
    postId: string;
    creatorId: string;
    text: string;
    reactions: Array<any>;
    creationTime: Timestamp;
    isAnswer: boolean;
    imgPath?: string;
}
