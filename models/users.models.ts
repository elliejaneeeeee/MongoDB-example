import connect from "../lib/index";
import { error } from "console";
import { ObjectId } from "mongodb";
import { CustomError, updateFields } from "../types";

export async function patchUserBookmarks(id: string, reqBody: string) {
    const parsedObj = JSON.parse(reqBody);
    const client = await connect();
    const db = client.db("test");
    const userID = new ObjectId(id);
    try {
        if (
            !parsedObj.hasOwnProperty("type") ||
            !parsedObj.hasOwnProperty("_id")
        ) {
            throw error;
        } else if (
            parsedObj.type !== "articles" &&
            parsedObj.type !== "forums"
        ) {
            throw error;
        } else if (!ObjectId.isValid(parsedObj._id)) {
            throw error;
        }
        let successfulUpdate: boolean;
        const bookmarkExists = await db.collection("users").findOne({
            _id: userID,
            bookmarks: { $elemMatch: { _id: parsedObj._id } },
        });

        if (bookmarkExists) {
            const { acknowledged }: { acknowledged: boolean } = await db
                .collection("users")
                .updateOne(
                    { _id: userID },
                    { $pull: { bookmarks: parsedObj } }
                );
            successfulUpdate = acknowledged;
        } else {
            const { acknowledged }: { acknowledged: boolean } = await db
                .collection("users")
                .updateOne(
                    { _id: userID },
                    { $push: { bookmarks: parsedObj } }
                );
            successfulUpdate = acknowledged;
        }

        return successfulUpdate
            ? successfulUpdate
            : Promise.reject({ status: 500, msg: "Server Error" });
    } catch (error) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }
}

export async function fetchUserById(id: string) {
    try {
        const userId = new ObjectId(id);
        const client = await connect();
        const db = client.db("test");

        const user = await db.collection("users").findOne({ _id: userId });

        if (!user) {
            return { error: "404 Error: Resource doesn't exist", status: 404 };
        }

        return user;
    } catch (error) {
        return { error: "400 Error: Invalid ID Syntax", status: 400 };
    }
}

export async function updateUser(id: string, fields: updateFields) {
    const client = await connect();
    const db = client.db("test");
    try {
        const userId = new ObjectId(id);
        const updatedUser = await db
            .collection("users")
            .findOneAndUpdate(
                { _id: userId },
                { $set: fields },
                { returnDocument: "after" }
            );

        return updatedUser;
    } catch (error: any) {
        if (error.errorResponse.code === 121) {
            throw new CustomError("400 Bad Request", 400);
        }

        throw new CustomError("Resource not found", 404);
    }
}

export async function insertUser(
    username: string,
    full_name: string,
    email: string,
    password: string
) {
    try {
        const client = await connect();
        const db = client.db("test");

        const isAlreadyExisting = await db
            .collection("users")
            .findOne({ username: username });

        if (isAlreadyExisting) {
            throw new Error("Username Already Exists!");
        }

        const newUser = {
            _id: new ObjectId(),
            username,
            full_name,
            email,
            password,
            bookmarks: [],
            progress: [],
        };

        const status = await db.collection("users").insertOne(newUser);
        const userPosted = await db
            .collection("users")
            .findOne({ _id: status.insertedId });
        const post = { ...status, ...userPosted };

        return post;
    } catch (error: any) {
        throw new Error(error);
    }
}
