import connect from "../index";


export async function seed(usersData: any, flashcardsData:any, forumsData: any, articlesData: any) {
  const client = await connect();
  const db = client.db("test");

  const users = db.collection("users");
  await users.deleteMany({});

  const articles = db.collection("articles");
  await articles.deleteMany({});

  const forums = db.collection('forums')
  await forums.deleteMany({});

  const flashcards = db.collection("flashcards");
  await flashcards.deleteMany({});

  await users.insertMany(usersData);
  await flashcards.insertMany(flashcardsData);
  await forums.insertMany(forumsData);
  await articles.insertMany(articlesData);
}

