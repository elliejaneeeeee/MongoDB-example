import { articlesData } from "../lib/testdata/articles";
import { flashcardsData } from "../lib/testdata/flashcards";
import { forumsData } from "../lib/testdata/forums";
import { usersData } from "../lib/testdata/users";
import { runSeed } from "../lib/seed/run-seed";
import connect from "../lib/index";
import * as mongoDB from "mongodb";
const request = require("supertest");

const local: string = "http://localhost:3000";

describe("seed", () => {
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
            const response = await request(local).get("/api/users");

            // console.log(response);

            expect(response.status).toBe(200);
            expect(typeof response.body).toEqual("object");
        });
    });

    describe.only("/api/users/:_id", () => {
        test("Should return data associated with specified id", async () => {
            const response = await request(local).get(
                "/api/users/664db5ae509cc0afb30cc382"
            );

            expect(response.status).toBe(200);
            expect(response.body.msg.full_name).toBe("Alex Johnson");
        });
        test("Should return a 404 error for non-existent id", async () => {
            const response = await request(local).get(
                "/api/users/664d9e9f509cc0afb30cc369"
            );

            expect(response.status).toBe(404);
            expect(response.body.msg).toBe("User not found");
        });
        test("Should return a 400 error for an invalid id Type", async () => {
            const response = await request(local).get(
                "/api/users/non-valid-id-string"
            );

            expect(response.status).toBe(400);
            expect(response.body.msg).toBe("Invalid ID format");
        });
    });
});
