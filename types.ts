import { ObjectId } from "mongodb";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}
export class CustomError extends Error {
  status: errorMsg;

  constructor(msg: string, status: number) {
    super(msg);
    this.status = { code: status, msg };
  }
}
export type errorMsg = {
  code: number;
  msg: string;
};

export type userResponse = {
  acknowledged: boolean;
  insertedId: ObjectId;
  _id: ObjectId;
  username: string;
  full_name: string;
  email: string;
  password: string;
  bookmarks: number;
  progress: Lesson[] | [];
};

export type comments = {
  _id: ObjectId;
  author: string;
  body: string;
  votes: number;
  date: Date;
};

export type forums = {
  _id: ObjectId;
  title: string;
  body: string;
  author: string;
  votes: number;
  date: Date;
  comments: comments[];
};

type Lesson = {
  [key: `lesson${number}`]: boolean;
};

export type users = {
  _id: ObjectId;
  username: string;
  full_name: string;
  email: string;
  password: string;
  bookmarks: string[];
  progress: Lesson[];
};

export type flashcards = {
  _id: ObjectId;
  unit: number;
  section: string;
  title: string;
  body: string[];
  img_url: string;
};

export type flashcardsResponse = {
  flashcards: flashcards[];
};

export type articles = {
  _id: ObjectId;
  title: string;
  link: string;
  img_url: string;
  body: string;
  source: string;
  votes: number;
};

export type updateFields = {
  username?: string;
  password?: string;
  full_name?: string;
  email?: string;
  bookmarks?: string;
};

export type Saves = {
  type: string;
  _id: string;
};
