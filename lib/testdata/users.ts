import { ObjectId } from "mongodb";
import { users } from "../../types";

interface Lesson {
    [key: `lesson${number}`]: boolean;
}


const userid_1: ObjectId = new ObjectId("664db5ae509cc0afb30cc382");
const userid_2: ObjectId = new ObjectId("664db5af509cc0afb30cc383");
const userid_3: ObjectId = new ObjectId("664db5b0509cc0afb30cc384");
const userid_4: ObjectId = new ObjectId("664db5b1509cc0afb30cc385");
const userid_5: ObjectId = new ObjectId("664db5b1509cc0afb30cc386");

export const usersData: users[] = [
    {
        _id: userid_1,
        username: "parentpro",
        full_name: "Alex Johnson",
        email: "alex.johnson@example.com",
        password:
            "$2a$10$6bqGx0BuW2KMWOXp7SLxy.Zz/uXxdxmZE0rOkSiyw8fDZ4q3/azly",
        bookmarks: [],

        progress: [
            { lesson1: true },
            { lesson2: false },
            { lesson3: true },
            { lesson4: false },
        ],
    },
    {
        _id: userid_2,
        username: "sleepguru",
        full_name: "Maria Rodriguez",
        email: "maria.rodriguez@example.com",
        password:
            "$2a$10$nVSY1oIMt4lfvWCRR9CzXesCIBecqFdA6dmjCetgzTZGF1tvAE8u6",
        bookmarks: [],

        progress: [
            { lesson1: true },
            { lesson2: true },
            { lesson3: false },
            { lesson4: false },
        ],
    },
    {
        _id: userid_3,
        username: "dadoftwins",
        full_name: "David Lee",
        email: "david.lee@example.com",
        password:
            "$2a$10$1clpr2YlvFE4NP4jziNL9eR22MdzkD.XFUfhdI5DoCwDju9fZv.UW",
        bookmarks: [ {_id: '664d9e9f509cc0afb30cc369', type: 'articles' }],
        progress: [
            { lesson1: false },
            { lesson2: true },
            { lesson3: false },
            { lesson4: true },
        ],
    },
    {
        _id: userid_4,
        username: "nutritionistmom",
        full_name: "Sophie Brown",
        email: "sophie.brown@example.com",
        password:
            "$2a$10$H9BI.esDl6rqWhNQVeppZe./VJVTzFLqJWD88e7Zi5KiqawmMbdrC",
        bookmarks: [{_id: '664d9e9f509cc0afb30cc369', type: 'articles' }],
        progress: [
            { lesson1: true },
            { lesson2: true },
            { lesson3: true },
            { lesson4: false },
        ],
    },
    {
        _id: userid_5,
        username: "newdad123",
        full_name: "Liam Smith",
        email: "liam.smith@example.com",
        password:
            "$2a$10$cjdw4rQpZi45//eXiRkdJuwZjqGjQbsQxPrJES2jylH9HPFSfbTzy",
        bookmarks: [],
        progress: [
            { lesson1: true },
            { lesson2: false },
            { lesson3: true },
            { lesson4: true },
        ],
    },
];
