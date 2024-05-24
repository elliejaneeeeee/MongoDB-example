import { ObjectId } from "mongodb";
export interface comments {
    _id: ObjectId;
    author: string;
    body: string;
    votes: number;
    date: Date;
}