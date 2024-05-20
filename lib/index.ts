import { MongoClient } from "mongodb";

async function connect() {
    if (!process.env.MONGODB_URI) throw new Error("Process.env undefined");

    const URI: string = process.env.MONGODB_URI;
    const client = new MongoClient(URI);

  try {
    await client.connect()
    console.log("Connected!");
    return client

  } catch (e) {
    console.log("index.ts", e);

  }
}


export default connect
