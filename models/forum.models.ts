import connect from "../lib/index";
import { ObjectId } from "mongodb";
import { error } from "console";

export async function fetchAllForums() {
  const client = await connect();
  const db = client.db("test");
  const forums = await db.collection("forums").find({}).toArray();
  return forums;
}
export async function getForumPostById(id: string) {
  if (id.length !== 24 || !/^[a-zA-Z0-9]+$/.test(id)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  const client = await connect();
  const db = client.db("test");
  const postId = new ObjectId(id);
  const postWithId = await db.collection("forums").findOne({ _id: postId });
  if (!postWithId) {
    return Promise.reject({ status: 404, msg: "Not Found" });
  }
  return postWithId;
}
export async function postToForum(post: string) {
  try {
    const client = await connect();
    const newForumPost = await JSON.parse(post);
    newForumPost.votes = 0;
    newForumPost.comments = [];
    newForumPost.date = new Date();

    const db = client.db("test");

    const dataFromInsert = await db.collection("forums").insertOne(newForumPost);
    const newPostFromDatabase = await db
      .collection("forums")
      .findOne({ _id: dataFromInsert.insertedId });

    return newPostFromDatabase;
  } catch (error: any) {
    throw error;
  }
}
export async function postComment(id: string, commentReq: string) {
  const commentObj = JSON.parse(commentReq);
  const client = await connect();
  const db = client.db("test");
  const postId = new ObjectId(id);
  try {
    if (
      !commentObj.hasOwnProperty("author") ||
      !commentObj.hasOwnProperty("body")
    ) {
      throw error;
    } else if (Object.values(commentObj).includes("")) {
      throw error;
    }
    commentObj.date = new Date();
    commentObj.votes = 0;
    commentObj._id = new ObjectId()
    
    await db
      .collection("forums")
      .updateOne({ _id: postId }, { $push: { comments: commentObj } });
      const newCommentSearch = await db.collection('forums').aggregate([{$match: {_id: postId}}, {$project: {comments: {$filter: {input: '$comments', as: 'comment',  cond: { $eq: ["$$comment._id", commentObj._id] }}}}}]).toArray()
     const newComment = newCommentSearch[0].comments[0]
    if (!newComment) {
      throw error;
    }
    return newComment
  } catch (error) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
}
