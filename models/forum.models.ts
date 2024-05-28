import connect from "../lib/index";
import { ObjectId } from "mongodb";


export async function postToForum(post: string) {

    const client = await connect();
    const newForumPost = await JSON.parse(post);
    
    newForumPost.votes = 0;
    newForumPost.comments = [];
    newForumPost.date = new Date();

    const db = client.db("test");

    const dataFromInsert = await db
      .collection("forums")
      .insertOne(newForumPost);
    const newPostFromDatabase = await db
      .collection("forums")
      .findOne({ _id: dataFromInsert.insertedId });
        
    return newPostFromDatabase;

}