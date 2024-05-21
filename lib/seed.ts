import connect from "@/lib";
import { usersData } from "./testdata/users";

async function seed(usersData: any) {
  const client = await connect();
  const db = client.db("test");
  const collections = await db.collection("users").drop();

  
}

seed(usersData);
