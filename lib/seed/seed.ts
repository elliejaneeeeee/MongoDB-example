import connect from "../index";
export const flashcardsSchema = {
  bsonType: "object",
  required: ["unit", "section", "title", "body", 'img_url'],
  properties: {
    unit: {
      bsonType: "number",
    },
    section: {
      bsonType: "string",
    },
    title: {
      bsonType: "string",
    },
    body: {
      bsonType: "array",
    },
    img_url:{
      bsonType: 'string'
    }
  }
};
export const forumSchema = {
  bsonType: "object",
  required: ["title", "body", "author", "date", 'comments', 'votes'],
  properties: {
    title: {
      bsonType: "string",
    },
    body: {
      bsonType: "string",
    },
    author: {
      bsonType: "string",
    },
    date: {
      bsonType: "date",
    },
    comments:{
      bsonType: 'array'
    },
    votes: {
      bsonType: 'number'
    }
  }
};
export const usersSchema = {
  bsonType: "object",
  required: ["username", "full_name", "email", "password", 'bookmarks', 'progress'],
  properties: {
    username: {
      bsonType: "string",
    },
    full_name: {
      bsonType: "string",
    },
    email: {
      bsonType: "string",
    },
    password: {
      bsonType: "string",
    },
    bookmarks:{
      bsonType: 'number'
    },
    progress: {
      bsonType: 'array'
    }
  }
};
export const articlesSchema = {
  bsonType: "object",
  required: ["title", "link", "img_url", "body", 'source'],
  properties: {
    title: {
      bsonType: "string",
    },
    link: {
      bsonType: "string",
    },
    img_url: {
      bsonType: "string",
    },
    body: {
      bsonType: "string",
    },
    source:{
      bsonType: 'string'
    }
  }
};

export async function seed(usersData: any, flashcardsData:any, forumsData: any, articlesData: any) {
  const client = await connect();
  const db = client.db("test");
  
  await db.command({
    collMod: "flashcards",
    validator: { $jsonSchema: flashcardsSchema },
    validationLevel: "strict",
    validationAction: "error"
  });
  await db.command({
    collMod: "forums",
    validator: { $jsonSchema: forumSchema },
    validationLevel: "strict",
    validationAction: "error"
  });
  await db.command({
    collMod: "users",
    validator: { $jsonSchema: usersSchema },
    validationLevel: "strict",
    validationAction: "error"
  });
  await db.command({
    collMod: "articles",
    validator: { $jsonSchema: articlesSchema },
    validationLevel: "strict",
    validationAction: "error"
  });

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
