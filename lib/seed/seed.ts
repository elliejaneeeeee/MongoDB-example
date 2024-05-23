import { ObjectId } from "mongodb";
import connect from "../index";
const mongoose = require('mongoose');
const { Schema } = mongoose;

export async function seed(usersData: any, flashcardsData:any, forumsData: any, articlesData: any) {
  const client = await connect();
  const db = client.db("test");

  const users = db.collection("users");
  await users.deleteMany({});

  const articles = db.collection("articles");
  await articles.deleteMany({});
  const commentSchema = new Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }
  });
  const forumSchema = {
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
  const forums = db.collection('forums')
  await db.command({
    collMod: "forums",
    validator: { $jsonSchema: forumSchema },
    validationLevel: "strict",
    validationAction: "error"
  })
  await forums.deleteMany({});

  const flashcards = db.collection("flashcards");
  await flashcards.deleteMany({});


  await users.insertMany(usersData);
  await flashcards.insertMany(flashcardsData);
  await forums.insertMany(forumsData);
  await articles.insertMany(articlesData);
}

