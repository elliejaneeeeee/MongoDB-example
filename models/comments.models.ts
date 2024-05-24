import connect from "../lib/index";
import { ObjectId } from "mongodb";
import { error } from "console";

export async function postComment(id: string, commentReq: string) {
  const commentObj = JSON.parse(commentReq);
 
  const client = await connect();
  const db = client.db("test");
  const postID = new ObjectId(id);

  try{
    if (
        !commentObj.hasOwnProperty("author") ||     //checks req body is correct format
        !commentObj.hasOwnProperty("body")
      ) {
          throw error
      } else if (Object.values(commentObj).includes("")) { //checks no fields are empty
          throw error
      }
      commentObj.date = new Date();   //give object new properties to match others in database
      commentObj.votes = 0;
      commentObj._id = new ObjectId();  // saves having to import from client side when only author and body needed for post at first
    
      const commentID = commentObj._id
      
      const databaseResponse = await db
        .collection("forums")
        .updateOne({ _id: postID }, { $push: { comments: commentObj } })

        if(databaseResponse.acknowledged === false){ // check if post is success
          throw error
        }
          return commentID.toString() // returns comment ID in string format for use in getCommentById function in route.ts- 
                                   //no need to check database again here to return comment obj out of request, when reusable function can do it in controller
  }catch(error){
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  
}

export async function getCommentById(id: string, commId: string) {
  const client = await connect();
  const db = client.db("test");
  if (commId.length !== 24 || !/^[a-zA-Z0-9]+$/.test(commId)) { //if id is not hexadecimal 24 character string it is invalid (ObjectId format)
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  const postID = new ObjectId(id);
  const commentID = new ObjectId(commId);
  const commentData = await db
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
  if (commentData[0].comments.length === 0) {
    return Promise.reject({ status: 404, msg: "Not Found" }); // if comment id format valid but not found in database throw 404
  }
  return commentData[0].comments[0]; // returns individual comment object matching the comment ID
}
export async function patchComment(
  id: string,
  commId: string,
  parsedVotes: number
) {
  const client = await connect();
  const db = client.db("test");
  const post = new ObjectId(id);
  const comment = new ObjectId(commId);

  try {
  await db
      .collection("forums")                
      .updateOne(
        { _id: post, "comments._id": comment },       //if request object is not exactly correct database will throw error 
        { $inc: { "comments.$.votes": parsedVotes } } // as database cannot increment by anything other than integer, so no need to check req obj 
        );
} catch (error) {
    return Promise.reject({status: 400, msg: 'Bad Request'})  //if database throws error it is converted to 400 as all issues with req bodies are 400 errors
  }
}
