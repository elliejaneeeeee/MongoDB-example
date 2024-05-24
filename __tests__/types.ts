import { ObjectId } from "mongodb";

export interface forums {
    _id: ObjectId;
    title: string;
    body: string;
    author: string;
    votes: number;
    date: Date;
    comments: comments[];
}
export interface comments {
    _id: ObjectId;
    author: string;
    body: string;
    votes: number;
    date: Date;
}