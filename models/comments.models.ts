import connect from "../lib/index";
import { ObjectId } from "mongodb";
import { error } from "console";

export async function postComment(id: string, reqBody: string) {
  const commentObj = JSON.parse(reqBody);
 
  const client = await connect();
  const db = client.db("Parentify");
  const postID = new ObjectId(id);

  try {
    if (
        !commentObj.hasOwnProperty("author") ||    
        !commentObj.hasOwnProperty("body")
      ) {
          throw error
      } else if (Object.values(commentObj).includes("")) { 
          throw error
      }
      commentObj.date = new Date();   
      commentObj.votes = 0;
      commentObj._id = new ObjectId();  
    
      const commentID = commentObj._id
      
      const {acknowledged}:{acknowledged: boolean} = await db
        .collection("forums")
        .updateOne({ _id: postID }, { $push: { comments: commentObj } })

        if (!acknowledged){
         return Promise.reject({status: 500, msg: 'Server Error'})
        } 
          return commentID.toString() 
                                   
  }catch(error){
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
}
//refactor so can check forum post id && comment id
export async function getCommentById(id: string, commId: string) {
  const client = await connect();
  const db = client.db("Parentify");

  if(!ObjectId.isValid(commId) || !ObjectId.isValid(id)){
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  const postID = new ObjectId(id);
  const commentID = new ObjectId(commId);

  const postData = await db
    .collection("forums")
    .aggregate([
      { $match: { _id: postID } },
      {
        $project: {
          comments: {
            $filter: {
              input: "$comments",
              as: "comment",
              cond: { $eq: ["$$comment._id", commentID] },
            },
          },
        },
      },
    ])
    .toArray(); // returns comment array by forum and comment id
   const postNotFound: boolean = postData.length === 0
   const commentNotFound: boolean = postData[0].comments.length === 0
  
  if (postNotFound || commentNotFound) { 
    return Promise.reject({ status: 404 , msg: "Not Found" }); 
  }
  return postData[0].comments[0]; // returns individual comment object matching the comment ID
}
//refactor to throw error here
export async function deleteComment(id: string, commId: string, commentObj: any) {
  
  const client = await connect();
  const db = client.db("Parentify");
  const postID = new ObjectId(id);
  //const commentID = new ObjectId(commId);
      const {acknowledged, modifiedCount}: {acknowledged: boolean, modifiedCount: number } = await db.collection('forums').updateOne({_id: postID},{ $pull: {comments: commentObj}})// refactor server error
      return acknowledged && modifiedCount === 1 ? acknowledged : Promise.reject({status: 500, msg: 'Server Error'})
}
export async function patchComment(
  id: string,
  commId: string,
  votesToAdd: number
) {
  const client = await connect();
  const db = client.db("Parentify");
  const post = new ObjectId(id);
  const commentID = new ObjectId(commId);

  const {acknowledged, modifiedCount}: {  //database returns with object with these keys
      acknowledged: boolean;
      modifiedCount: number;
    } = await db.collection("forums").updateOne(
      { _id: post, "comments._id": commentID }, 
      { $inc: { "comments.$.votes": votesToAdd } } 
    );
  return acknowledged && modifiedCount === 1
    ? acknowledged
    : Promise.reject({ status: 500, msg: "Server Error" });
}
