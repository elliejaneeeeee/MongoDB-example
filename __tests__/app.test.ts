import { articlesData } from "../lib/testdata/articles";
import { flashcardsData } from "../lib/testdata/flashcards";
import { forumsData } from "../lib/testdata/forums";
import { usersData } from "../lib/testdata/users";

import { runSeed } from "../lib/seed/run-seed";
import connect from "../lib/index";
import * as mongoDB from "mongodb";
import { NextRequest, NextResponse } from "next/server";

import { GET as getAllUsers } from "../app/api/users/route";
import { POST as postUser } from "../app/api/users/route";
import { GET as getUserById } from "../app/api/users/[id]/route";

let client: mongoDB.MongoClient;
let db: mongoDB.Db;

beforeAll(async () => {
  client = await connect();
  db = client.db("test");
});

beforeEach(async () => {
  await runSeed(usersData, flashcardsData, forumsData, articlesData);
});

afterAll(async () => {
  await client.close();
});

describe("seed()", () => {
  test("seed should insert data into the users collection", async () => {
    const users = db.collection("users");
    const count = await users.countDocuments();

    expect(count).toBe(5);
  });
  test("seed should insert data into the articles collection", async () => {
    const articles = db.collection("articles");
    const count = await articles.countDocuments();

    expect(count).toBe(5);
  });
  test("seed should insert data into the forums collection", async () => {
    const forums = db.collection("forums");
    const count = await forums.countDocuments();

    expect(count).toBe(5);
  });
  test("seed should insert data into the flashcards collection", async () => {
    const flashcards = db.collection("flashcards");
    const count = await flashcards.countDocuments();

    expect(count).toBe(5);
  });
});

describe("/api/users", () => {
  describe("GET", () => {
    test("Should return an array of all users", async () => {
      const req = {} as NextRequest;
      const res = (await getAllUsers(req)) as NextResponse;

      const data = await res.json();

      expect(res.status).toBe(200);
      expect(Array.isArray(data.users)).toBe(true);
      expect(data.users.length).toBe(5);

      data.users.forEach((user: any) => {
        expect(user).toHaveProperty("_id");
        expect(user).toHaveProperty("full_name");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("password");
        expect(user).toHaveProperty("bookmarks");
        expect(user).toHaveProperty("progress");
      });
    });
  });

  describe("POST", () => {
    test("POST 201: Should return a 201 status code with the comment body", async () => {
      const mockJson = jest.fn().mockResolvedValue({
        body: {
          username: "sofiac",
          full_name: "Sofia Carlos",
          email: "sofia.c1996@example.com",
          password: "puppies96",
        },
      });

      const req = {
        json: mockJson,
      } as unknown as NextRequest;

      const res = (await postUser(req)) as NextResponse;

      const data = await res.json();

      expect(res.status).toBe(201);
      expect(data.acknowledged).toBe(true);
      expect(data).toHaveProperty("_id");
      expect(data).toHaveProperty("username");
      expect(data).toHaveProperty("full_name");
      expect(data).toHaveProperty("email");
      expect(data).toHaveProperty("password");
      expect(data).toHaveProperty("bookmarks");
      expect(data).toHaveProperty("progress");
      expect(data).not.toHaveProperty("age");
    });
    test("POST 201: Should ignore extra inputs", async () => {
      const mockJson = jest.fn().mockResolvedValue({
        body: {
          full_name: "Sofia Carlos",
          username: "sofiac",
          email: "sodia.c1996@example.com",
          password: "puppies96",
          age: 42,
        },
      });

      const req = {
        json: mockJson,
      } as unknown as NextRequest;

      const res = (await postUser(req)) as NextResponse;

      const data = await res.json();

      expect(res.status).toBe(201);
      expect(data.acknowledged).toBe(true);
      expect(data).toHaveProperty("_id");
      expect(data).toHaveProperty("full_name");
      expect(data).toHaveProperty("email");
      expect(data).toHaveProperty("password");
      expect(data).toHaveProperty("bookmarks");
      expect(data).toHaveProperty("progress");
      expect(data).not.toHaveProperty("age");
    });
    test("POST 400: Should return an error when the request body is malformed/ has missing fields", async () => {
      const mockJson = jest.fn().mockResolvedValue({
        body: {},
      });

      const req = {
        json: mockJson,
      } as unknown as NextRequest;

      const res = (await postUser(req)) as NextResponse;

      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.msg).toBe("400 Error: Missing/Malformed fields");
    });
    test("POST 400: Should return an error when the username already exists in the database", async () => {
      const mockJson = jest.fn().mockResolvedValue({
        body: {
          username: "parentpro",
          full_name: "Alex Johnson",
          email: "alex.johnson@example.com",
          password: "P@ssw0rd123",
        },
      });

      const req = {
        json: mockJson,
      } as unknown as NextRequest;

      const res = (await postUser(req)) as NextResponse;

      const data = await res.json();

      expect(res.status).toBe(400)
      expect(data.msg).toBe("400 Error: Username Already Exists!");
    });
  });
});

describe("/api/users/:_id", () => {
  test("Should return data associated with specified id", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "664db5ae509cc0afb30cc382" } };
    const res = (await getUserById(req, params)) as NextResponse;

    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.user.full_name).toBe("Alex Johnson");
  });
  test("Should return a 404 error for non-existent id", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "664d9e9f509cc0afb30cc369" } };
    const res = (await getUserById(req, params)) as NextResponse;

    const user = await res.json();

    expect(res.status).toBe(404);
    expect(user.error).toBe("404 Error: Resource doesn't exist");
  });
  test("Should return a 400 error for an invalid id Type", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "non-valid-id-string" } };
    const res = (await getUserById(req, params)) as NextResponse;

    const user = await res.json();

    expect(res.status).toBe(400);
    expect(user.error).toBe("400 Error: Invalid ID Syntax");
  });
});
