import { MongoClient } from "mongodb";

async function connect() {
  if (!process.env.MONGODB_URI) throw new Error("Process.env is not defined! Add it into a .env file");

  const URI: string = process.env.MONGODB_URI;
  const client = new MongoClient(URI);

  try {
    await client.connect();
    console.log("Connected!");
    return client;
  } catch (e) {
    throw new Error("Connection failed")
  }
}

export default connect;
