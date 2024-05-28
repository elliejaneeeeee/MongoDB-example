import { articlesData } from "../lib/testdata/articles";
import { flashcardsData } from "../lib/testdata/flashcards";
import { forumsData } from "../lib/testdata/forums";
import { usersData } from "../lib/testdata/users";
import { runSeed } from "../lib/seed/run-seed";
import connect from "../lib/index";
import * as mongoDB from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import {PATCH as patchArticle} from '../app/api/articles/[id]/route' 
import { GET as getAllForums } from "../app/api/forums/route";
import { POST as postToForums } from "../app/api/forums/route";
import { GET as getAllUsers } from "../app/api/users/route";
import { GET as getUserById, DELETE as deleteUser } from "../app/api/users/[id]/route";
import { GET as getFlashcards } from "../app/api/flashcards/[id]/route";
import { GET as getForumPost, DELETE as deleteForumPost, PATCH as patchForumPost } from "../app/api/forums/[id]/route";
import { POST as postForumComment } from "../app/api/forums/[id]/comments/route";
import { PATCH as patchCommentVotes, DELETE as deleteComment, GET as getCommentByID } from "../app/api/forums/[id]/comments/[commId]/route";
import {GET as getAllFlashcards} from '../app/api/flashcards/route'



let client: mongoDB.MongoClient;
let db: mongoDB.Db;

beforeAll(async () => {
  client = await connect();
  db = client.db("test");
  console.log('connected')
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
  });
  test("Should return a 400 error for an invalid id Type", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "non-valid-id-string" } };
    const res = (await getUserById(req, params)) as NextResponse;
    await res.json();
    expect(res.status).toBe(400);
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
  test("returns 400 error for missing properties", async () => {
    const post: {} = {
      body: "hello everyone",
      author: "joeanne",
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const res = (await postToForums(request)) as NextResponse;
    expect(res.status).toBe(400);
  });
  test("returns 400 error for incorrect properties type", async () => {
    const post: {} = {
      title: "hello",
      body: "hello everyone",
      author: 5,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "POST",
      body: JSON.stringify(post),
    });
    const res = (await postToForums(request)) as NextResponse;
    expect(res.status).toBe(400);
  });
});
describe("GET /api/forums/id", () => {
  test("responds with 200 and forum post object for correct id", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "664db460509cc0afb30cc376" } };
    const res = (await getForumPost(req, params)) as NextResponse;
    const { post } = await res.json();
    expect(res.status).toBe(200);
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("body");
    expect(post).toHaveProperty("comments");
    expect(post).toHaveProperty("votes");
    expect(post).toHaveProperty("date");
    expect(post).toHaveProperty("author");
  });
  test("400 error for invalid id type", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "non-valid-idstring" } };
    const res = (await getForumPost(req, params)) as NextResponse;
    expect(res.status).toBe(400);
  });
  test("404 error for non-existent id", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "664db45a509cc0afb30cc777" } };
    const res = (await getForumPost(req, params)) as NextResponse;
    expect(res.status).toBe(404);
  });
});
describe("POST api/forums/:id/comments", () => {
  test("returns status 201 and comment object with correct properties", async () => {
    const params = { params: { id: "664db460509cc0afb30cc376" } };
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
    expect(comment).toHaveProperty("author");
    expect(comment).toHaveProperty("body");
    expect(comment).toHaveProperty("date");
    expect(comment).toHaveProperty("votes");
  });
  test("400 error for invalid id type", async () => {
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
  });
  test("404 error for non-existent id", async () => {
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
  });
  test("400 error for invalid req body", async () => {
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
  });
});
describe("PATCH /api/forums/:id/comments/:id", () => {
  test("returns a 201 status and new votes object", async () => {
    const params = {
      params: {
        id: "664db45a509cc0afb30cc373",
        commId: "664db4cf509cc0afb30cc378",
      },
    };
    const post: {} = {
      inc_votes: -1,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const res = (await patchCommentVotes(request, params)) as NextResponse;
    const { comment } = await res.json();
    expect(res.status).toBe(200);
    expect(comment.votes).toBe(9);
  });
  test("400 error for invalid comment id type", async () => {
    const params = {
      params: { id: "664db45a509cc0afb30cc777", commId: "664db4cf509cc0afb30c" },
    };
    const post: {} = {
      inc_votes: 1,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const res = (await patchCommentVotes(request, params)) as NextResponse;
    expect(res.status).toBe(400);
  });
  test("404 error for non-existent comment id on specific article", async () => {
    const params = {
      params: {
        id: "664db45a509cc0afb30cc373",
        commId: "664db4d6509cc0afb30cc37f",
      },
    };
    const post: {} = {
      inc_votes: 1,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const res = (await patchCommentVotes(request, params)) as NextResponse;
    expect(res.status).toBe(404);
  });
  test("400 error for invalid body", async () => {
    const params = {
      params: { id: "664db45a509cc0afb30cc373", commId: "664jsjso" },
    };
    const post: {} = {
      inc_votes: 'ff',
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const res = (await patchCommentVotes(request, params)) as NextResponse;
    expect(res.status).toBe(400);
  });
});
describe('DELETE /api/forums/:id/comments/:id', () => {
  test('returns 200 for deleted comment and deletes from database', async ()=> {
    const req = {} as NextRequest;
    const params = { params: { id: "664db460509cc0afb30cc376", commId: '664db4d5509cc0afb30cc37e'} }
    const queryResponse = await getCommentByID(req, params)
    expect(queryResponse.status).toBe(200)
    const res = await deleteComment(req, params) as NextResponse
    expect(res.status).toBe(200)
    const queryResponse2 = await getCommentByID(req, params)
    expect(queryResponse2.status).toBe(404)
  })
  test('returns 404 for valid comment id on wrong article id', async () => {
    const req ={} as NextRequest
    const params = {
      params: {
        id: "664db45a509cc0afb30cc373",
        commId: "664db4d7509cc0afb30cc381",
      },
    };
    const res = await deleteComment(req, params) as NextResponse
    expect(res.status).toBe(404)
  })
  test('returns 400 for invalid comment ID string', async () => {
    const req ={} as NextRequest
    const params = {
      params: {
        id: "664db45a509cc0afb30cc373",
        commId: "664db4d7509cc0a-s",
      },
    };
    const res = await deleteComment(req, params) as NextResponse
    expect(res.status).toBe(400)
  })
  test('only deletes one comment', async () => {
    const req = {} as NextRequest;
    const param ={params: { id: "664db460509cc0afb30cc376"}}
    const params = { params: { id: "664db460509cc0afb30cc376", commId: '664db4d6509cc0afb30cc37f'} }
    const forumQuery = await getForumPost(req, param)
    const forumData = await forumQuery.json()
    const res = await deleteComment(req, params) as NextResponse
    
    expect(res.status).toBe(200)
    const nextForumQuery = await getForumPost(req, param)
    const updateForumData = await nextForumQuery.json()
    
    expect(updateForumData.post.comments[1]).toBe(null)
    expect(forumData.post.comments.some((item: any) => item === null)).toBe(false)
    expect(updateForumData.post.comments[0]).toMatchObject({ 
        "author": "earlyeducator",
        "body": "Simple toys like stacking blocks and shape sorters are great for motor skills.",
        "date": "2024-05-05T11:00:00.000Z",
        "votes": 14,
  })
  })
})
describe('DELETE /api/forums/:id', () => {
  test('returns 200 status for deleted post and deletes in database', async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "664db460509cc0afb30cc376" } };
    const res = (await deleteForumPost(req, params)) as NextResponse;
    expect(res.status).toBe(200)
    const getPost = await getForumPost(req, params) as NextResponse
    expect(getPost.status).toBe(404)
  
  })
  test("400 error for invalid id type", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "non-valid-idstrajao" } };
    const res = (await deleteForumPost(req, params)) as NextResponse;
    expect(res.status).toBe(400);
  });
  test("404 error for non-existent id", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "664db45a509cc0afb30cc999" } };
    const res = (await deleteForumPost(req, params)) as NextResponse;
    expect(res.status).toBe(404);
  });
})
describe('DELETE /api/users/:id', () => {
  test('returns 200 status for deleted post', async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "664db5b0509cc0afb30cc384" } };
    const res = (await deleteUser(req, params)) as NextResponse;
    expect(res.status).toBe(200)
    const getUser = await getUserById(req, params)
    expect(getUser.status).toBe(404)
  })
  test("400 error for invalid id type", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "non-valid-idstrajao" } };
    const res = (await deleteUser(req, params)) as NextResponse;
    expect(res.status).toBe(400);
  });
  test("404 error for non-existent id", async () => {
    const req = {} as NextRequest;
    const params = { params: { id: "664db45a509cc0afb30cc999" } };
    const res = (await deleteUser(req, params)) as NextResponse;
    expect(res.status).toBe(404);
  });
})
describe("PATCH /api/articles/:id", () => {
  test("returns a 200 status and new article object", async () => {
    const params = {params: {id: "664daab4509cc0afb30cc36d" }};
    const post: {} = {
      inc_votes: -1,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const originalVotes = 3
    const res = (await patchArticle(request, params)) as NextResponse;
    const { article } = await res.json();
    expect(res.status).toBe(200);
    expect(article.votes).toBe(originalVotes - 1);
  });
  test("400 error for invalid article id type", async () => {
    const params = {params: { id: "664db45a509cc0af--"}}
    
    const post: {} = {
      inc_votes: 1,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const res = (await patchArticle(request, params)) as NextResponse;
    expect(res.status).toBe(400);
  });test("404 error for non-existent article", async () => {
    const params = {params: {id: "664db45a509cc0afb30cc373"}};
    const post: {} = {
      inc_votes: 1,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const res = (await patchArticle(request, params)) as NextResponse;
    expect(res.status).toBe(404);
  });
  test("400 error for invalid body", async () => {
    const params = {params: { id: "664daab4509cc0afb30cc36d"}};
    const post: {} = { inc_votes: 'ff' };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const res = (await patchArticle(request, params)) as NextResponse;
    expect(res.status).toBe(400);
  });
});
describe("PATCH /api/forums/:id", () => {
  test("returns a 200 status && new article object with votes prop && updates database", async () => {
    const params = {params: {id: "664db45a509cc0afb30cc373"}};
    //const req = {} as NextRequest
    const post: {} = {
      inc_votes: -1,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const originalVotes = 15 //from testdata
    const res = (await patchForumPost(request, params)) as NextResponse;
    const { forumPost } = await res.json();
    expect(res.status).toBe(200);
    expect(forumPost).toHaveProperty('votes')
    expect(forumPost.votes).toBe(originalVotes - 1);
    // const getResponse = getForumPost(req, params)
    // console.log(getResponse)
    //expect(res2.votes)
  });
  test("400 error for invalid article id type", async () => {
    const params = {params: { id: "664db45a509cc0af--"}}
    
    const post: {} = {
      inc_votes: 1,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const res = (await patchForumPost(request, params)) as NextResponse;
    expect(res.status).toBe(400);
  });test("404 error for non-existenthForumPost", async () => {
    const params = {params: {id: "664db45a509cc0afb30cc399"}};
    const post: {} = {
      inc_votes: 1,
    };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const res = (await patchForumPost(request, params)) as NextResponse;
    expect(res.status).toBe(404);
  });
  test("400 error for invalid body", async () => {
    const params = {params: { id: "664db460509cc0afb30cc376"}};
    const post: {} = { inc_votes: 'ff' };
    const request = new Request("http://localhost:3001/api/forums", {
      method: "PATCH",
      body: JSON.stringify(post),
    });
    const res = (await patchForumPost(request, params)) as NextResponse;
    expect(res.status).toBe(400);
  });
});

describe("GET /api/flashcards", () => {
  test("should return array of flashcards as objects", async () => {
    const req = {} as NextRequest;
    const res = (await getAllFlashcards(req)) as NextResponse;
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data.flashcards)).toBe(true);
    data.flashcards.forEach((flashcard: any) => {
      expect(flashcard).toHaveProperty("title");
      expect(flashcard).toHaveProperty("body");
      expect(flashcard).toHaveProperty("unit");
      expect(flashcard).toHaveProperty("section");
      expect(flashcard).toHaveProperty("img_url");
    });
  });
});
