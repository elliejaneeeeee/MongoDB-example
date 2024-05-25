import { ObjectId } from "mongodb";

export class CustomError extends Error {
  status: errorMsg
  
  constructor(msg: string, status: number) {
    super(msg)
    this.status = { code: status, msg}
  }
}
export interface errorMsg {
  code: number,
  msg: string
}

export interface userResponse {
  acknowledged: boolean;
  insertedId: ObjectId;
  _id: ObjectId;
  username: string;
  full_name: string;
  email: string;
  password: string;
  bookmarks: number;
  progress: Lesson[] | [];
}

export interface comments {
  _id: ObjectId;
  author: string;
  body: string;
  votes: number;
  date: Date;
}

export interface forums {
  _id: ObjectId;
  title: string;
  body: string;
  author: string;
  votes: number;
  date: Date;
  comments: comments[];
}

interface Lesson {
  [key: `lesson${number}`]: boolean;
}

export interface users {
  _id: ObjectId;
  username: string;
  full_name: string;
  email: string;
  password: string;
  bookmarks: number;
  progress: Lesson[];
}

export interface flashcards {
  _id: ObjectId;
  unit: number;
  section: string;
  title: string;
  body: string[];
  img_url: string;
}

export interface articles {
  _id: ObjectId;
  title: string;
  link: string;
  img_url: string;
  body: string;
  source: string;
}

export interface updateFields {
  username?: string,
  password?: string,
  full_name?: string,
  email?: string,
}
