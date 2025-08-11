import { FieldValue, Timestamp } from "firebase/firestore";

export interface Post {
    postId: string;
    creatorId: string;
    text: string;
    reactions: Array<any>;
    creationTime: Timestamp | FieldValue; // type is serveTimestamp() as FieldValue until document is written to firestore
    isAnswer: boolean;
    imgPath?: string;
}
