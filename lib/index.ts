import { MongoClient } from "mongodb";

const URI: string = process.env.MONGODB_URI!
let client: MongoClient

async function connect() {
  if (!URI) throw new Error("Process.env is not defined! Add it into a .env file");

  if (!client) {
    client = new MongoClient(URI)
    await client.connect()
  }
  
  return client
}

export default connect;
