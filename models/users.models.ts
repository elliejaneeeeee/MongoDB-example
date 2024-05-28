import connect from "../lib/index";
import { error } from "console";
import { ObjectId } from "mongodb";


export async function patchUserBookmarks(id: string, reqBody: string){
const parsedObj = JSON.parse(reqBody)
const client = await connect();
const db = client.db("test");
const userID = new ObjectId(id)
try{
if (
  !parsedObj.hasOwnProperty("type") ||    
  !parsedObj.hasOwnProperty("_id")
) {
    throw error
} else if (parsedObj.type !== 'articles' && parsedObj.type !== 'forums') { 
    throw error
}
else if (!ObjectId.isValid(parsedObj._id)) {
  throw error
}
let successfulUpdate : boolean
const bookmarkExists = await db
    .collection("users").findOne({_id: userID, bookmarks: {$elemMatch: {_id: parsedObj._id}}})

    if(bookmarkExists){
 const {acknowledged}: {acknowledged: boolean} = await db.collection('users').updateOne({_id: userID}, {$pull: {bookmarks: parsedObj}} )
 successfulUpdate = acknowledged
 }
else {
  const {acknowledged}: {acknowledged: boolean} = await db.collection('users').updateOne({_id: userID}, {$push: {bookmarks: parsedObj}})
successfulUpdate = acknowledged
}

return successfulUpdate ? successfulUpdate : Promise.reject({status: 500, msg: 'Server Error'})
}
catch(error){
return Promise.reject({status: 400, msg: 'Bad Request'})
}

}
