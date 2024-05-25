import connect from "../lib/index";
import { ObjectId } from "mongodb";

export async function deleteItem(id: string, {coll}: {coll: string}) {
    const client = await connect();
    const db = client.db("test");
    const postID = new ObjectId(id);
    const {acknowledged, deletedCount}: {acknowledged: boolean, deletedCount: number } = await db
    .collection(coll)
    .deleteOne({ _id: postID });
    
    return acknowledged && deletedCount === 1 ? acknowledged : Promise.reject({status: 500, msg: 'Server Error'})
   
  }
  export async function fetchById(id: string, {coll}: {coll: string}) {
    if(!ObjectId.isValid(id)){
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
   
      const itemId = new ObjectId(id);
      const client = await connect();
      const db = client.db("test");
  
      const item = await db.collection(coll).findOne({ _id: itemId });
      
      if (!item) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return item
  
    } //refactor into generic