import connect from "@/lib";
import { usersData } from "../../../lib/testdata/users";

async function seed(usersData: any) {
  const client = await connect();
  const db = client.db("test");

  const users = db.collection("users");
  await users.deleteMany({});
  await users.insertMany(usersData);
}

seed(usersData);
