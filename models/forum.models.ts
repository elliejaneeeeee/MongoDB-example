import connect from "../lib/index";
import { ObjectId } from "mongodb";

export async function fetchAllForums() {
  const client = await connect();
  const db = client.db("test");
  const forums = await db.collection("forums").find({}).toArray();
  return forums;
}

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
//refactor
export async function deleteForumPost(id: string) {
  const client = await connect();
  const db = client.db("test");
  const postID = new ObjectId(id);
  const {acknowledged, deletedCount}: {acknowledged: boolean, deletedCount: number } = await db
  .collection("forums")
  .deleteOne({ _id: postID });
  return acknowledged && deletedCount === 1 ? acknowledged : Promise.reject({status: 500, msg: 'Server Error'})
 
}
