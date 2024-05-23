import { articlesData } from "../lib/testdata/articles";
import { flashcardsData } from "../lib/testdata/flashcards";
import { forumsData } from "../lib/testdata/forums";
import { usersData } from "../lib/testdata/users";
import { runSeed } from "../lib/seed/run-seed";
import connect from "../lib/index";
import * as mongoDB from "mongodb";
import { NextRequest, NextResponse } from "next/server";


import { GET as getAllForums } from "../app/api/forums/route";
import { POST as postToForums } from "../app/api/forums/route";
import { GET as getAllUsers } from "../app/api/users/route";
import { GET as getUserById } from "../app/api/users/[id]/route";
import { GET as getFlashcards } from "../app/api/flashcards/[id]/route";
import {GET as getForumPost} from "../app/api/forums/[id]/route"
import {POST as postForumComment} from '../app/api/forums/[id]/comments/route'
import {PATCH as patchCommentVotes} from '../app/api/forums/[id]/comments/[commId]/route'


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
  test("Should return an array", async () => {
    const req = {} as NextRequest;
    const res = (await getAllUsers(req)) as NextResponse;

    const data = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(data.users)).toBe(true);

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

describe("GET /api/forums", () => {
  test("should return array of forum posts as objects", async () => {
    const req = {} as NextRequest;
    const res = (await getAllForums(req)) as NextResponse;
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data.forums)).toBe(true);
    data.forums.forEach((forum: any) => {
      expect(forum).toHaveProperty("title");
      expect(forum).toHaveProperty("body");
      expect(forum).toHaveProperty("comments");
      expect(forum).toHaveProperty("votes");
      expect(forum).toHaveProperty("date");
      expect(forum).toHaveProperty("author");
    });
  });
});

describe("GET /api/flashcards/id", () => {
  test("returns only flashcards with correct unit number", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "4" } };
    const res = (await getFlashcards(req, params)) as NextResponse;
    const flashcards = await res.json();
    expect(res.status).toBe(200);
    flashcards.flashcards.forEach((flashcard: any) => {
      expect(flashcard.unit).toBe(4);
    });
  });
  test("returns 400 error for incorrect unit id", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "5bool" } };
    const res = (await getFlashcards(req, params)) as NextResponse;
    const errorData = await res.json();
    expect(res.status).toBe(400);
    expect(res.ok).toBe(false);
    expect(errorData.msg).toBe("Bad Request");
  });
  test("Returns 404 error for non-existant unit id", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "200" } };
    const res = (await getFlashcards(req, params)) as NextResponse;
    const errorData = await res.json();
    expect(res.status).toBe(404);
    expect(res.ok).toBe(false);
    expect(errorData.msg).toBe("Not Found");
  });
});
describe("POST /api/forums", () => {
  test("returns status 201 with objectID and acknolegement of post", async () => {
    const post: {} = {
      title: "When to start sports?",
      body: "hello everyone",
      author: "joeanne",
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const res = (await postToForums(request)) as NextResponse;

    const { postData } = await res.json();
    expect(res.status).toBe(201);

    expect(typeof postData).toBe("object");
    expect(postData).toHaveProperty("title");
    expect(postData).toHaveProperty("author");
    expect(postData).toHaveProperty("body");
    expect(postData).toHaveProperty("votes");
    expect(postData).toHaveProperty("comments");
    expect(postData).toHaveProperty("date");
  });
  test('returns 400 error for missing properties', async () => {
    const post: {} = {
      body: "hello everyone",
      author: "joeanne",
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const res = (await postToForums(request)) as NextResponse;
    expect(res.status).toBe(400)
  })
  test('returns 400 error for incorrect properties type', async () => {
    const post: {} = {
      title: 'hello',
      body: "hello everyone",
      author: 5,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const res = (await postToForums(request)) as NextResponse;
    expect(res.status).toBe(400)
  })
});
describe('GET /api/forums/id', () => {
  test('responds with 200 and forum post object for correct id', async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "664db460509cc0afb30cc376" } };
    const res = (await getForumPost(req, params)) as NextResponse;
    const {post} = await res.json();
    expect(res.status).toBe(200);
    expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("body");
      expect(post).toHaveProperty("comments");
      expect(post).toHaveProperty("votes");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("author");
  })
  test('400 error for invalid id type', async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "non-valid-idstring" } };
    const res = (await getForumPost(req, params)) as NextResponse;
    expect(res.status).toBe(400);
  })
  test('404 error for non-existent id', async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "664db45a509cc0afb30cc777" } };
    const res = (await getForumPost(req, params)) as NextResponse;
    expect(res.status).toBe(404);
  })
})
describe('POST api/forums/:id/comments', () => {
  test('returns status 201 and comment object with correct properties', async () => {
    const params = { params: { id: "664db460509cc0afb30cc376" } }
    const post: {} = {
      body: "hello everyone",
      author: "joeanne",
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const res = (await postForumComment(request, params)) as NextResponse;

    const { comment } = await res.json();
    expect(res.status).toBe(201);
    expect(comment).toHaveProperty('author')
    expect(comment).toHaveProperty('body')
    expect(comment).toHaveProperty('date')
    expect(comment).toHaveProperty('votes')
  })
  test('400 error for invalid id type', async () => {
    const params = { params: { id: "non-valid-id//" } };
    const post: {} = {
      body: "hello everyone",
      author: "joeanne",
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const res = (await postForumComment(request, params)) as NextResponse;
    expect(res.status).toBe(400);
  })
  test('404 error for non-existent id', async () => {
    const params = { params: { id: "664db45a509cc0afb30cc555" } };
    const post: {} = {
      body: "hello everyone",
      author: "joeanne",
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const res = (await postForumComment(request, params)) as NextResponse;
    expect(res.status).toBe(404);
  })
  test('400 error for invalid req body', async () => {
    const params = { params: { id: "non-valid-id//" } };
    const post: {} = {
      bod: "hello everyone",
      author: "",
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const res = (await postForumComment(request, params)) as NextResponse;
    expect(res.status).toBe(400);
  })
})
describe('PATCH /api/forums/:id/comments/:id', () => {
  test('returns a 201 status and new votes object', async () => {
    const params = { params: { id: "664db45a509cc0afb30cc373", commId: '664db4cf509cc0afb30cc378' } }
    const post: {} = {
     inc_votes: -1,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const res = (await patchCommentVotes(request, params)) as NextResponse;
    const { response } = await res.json();
    expect(res.status).toBe(200)
    expect(response.votes).toBe(9)
})
test('400 error for invalid comment id type', async () => {
  const params = { params: { id: "664db45a509cc0afb30cc373", commId: '664jsjso' } };
  const post: {} = {
    inc_votes: 1
  };
  const request = new Request("http://localhost:3001/api/forums", {
    method: "PATCH",
    body: JSON.stringify(post),
  });
  const res = (await patchCommentVotes(request, params)) as NextResponse;
  expect(res.status).toBe(400);
})
test('404 error for non-existent comment id on specific article', async () => {
  const params = { params: { id: "664db45a509cc0afb30cc373", commId: '664db4d6509cc0afb30cc37f'} };
  const post: {} = {
    inc_votes: 1
  };
  const request = new Request("http://localhost:3001/api/forums", {
    method: "PATCH",
    body: JSON.stringify(post),
  });
  const res = (await patchCommentVotes(request, params)) as NextResponse;
  expect(res.status).toBe(404);
})

})


