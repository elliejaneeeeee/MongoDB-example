import { articlesData } from "../lib/testdata/articles";
import { flashcardsData } from "../lib/testdata/flashcards";
import { forumsData } from "../lib/testdata/forums";
import { usersData } from "../lib/testdata/users";
import { runSeed } from "../lib/seed/run-seed"
import connect from "../lib/index";
import * as mongoDB from "mongodb"

describe('seed', () => {
    let client: mongoDB.MongoClient
    let db: mongoDB.Db

    beforeAll(async () => {
        client = await connect();
        db = client.db("test");
    })
    
    beforeEach(async () => {
        await runSeed(usersData, flashcardsData, forumsData, articlesData)
    })

    afterAll(async () => {
        await client.close()
    })
    
    describe("seed()", () => {
        test("seed should insert data into the users collection", async () => {
            const users = db.collection("users")
            const count = await users.countDocuments()

            expect(count).toBe(5)
        })
        test("seed should insert data into the articles collection", async () => {
            const articles = db.collection("articles")
            const count = await articles.countDocuments()

            expect(count).toBe(5)
        })
        test("seed should insert data into the forums collection", async () => {
            const forums = db.collection("forums")
            const count = await forums.countDocuments()

            expect(count).toBe(5)
        })
        test("seed should insert data into the flashcards collection", async () => {
            const flashcards = db.collection("flashcards")
            const count = await flashcards.countDocuments()

            expect(count).toBe(5)
        })
    })
})
