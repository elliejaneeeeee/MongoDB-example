import { ObjectId } from "mongodb";
import { users } from "../../types";

const userid_1: ObjectId = new ObjectId("664db5ae509cc0afb30cc382");
const userid_2: ObjectId = new ObjectId("664db5af509cc0afb30cc383");
const userid_3: ObjectId = new ObjectId("664db5b0509cc0afb30cc384");
const userid_4: ObjectId = new ObjectId("664db5b1509cc0afb30cc385");
const userid_5: ObjectId = new ObjectId("664db5b1509cc0afb30cc386");

export const usersData: users[] = [
    {
        _id: userid_1,
        username: 'parentpro',
        full_name: "Alex Johnson",
        email: "alex.johnson@example.com",
        password: "P@ssw0rd123",
        bookmarks: 12,
        progress: [
            { lesson1: true },
            { lesson2: false },
            { lesson3: true },
            { lesson4: false },
        ],
    },
    {
        _id: userid_2,
        username: 'sleepguru',
        full_name: "Maria Rodriguez",
        email: "maria.rodriguez@example.com",
        password: "M4ri@R0d!",
        bookmarks: 8,
        progress: [
            { lesson1: true },
            { lesson2: true },
            { lesson3: false },
            { lesson4: false },
        ],
    },
    {
        _id: userid_3,
        username: 'dadoftwins',
        full_name: "David Lee",
        email: "david.lee@example.com",
        password: "Dav1dL33$",
        bookmarks: 15,
        progress: [
            { lesson1: false },
            { lesson2: true },
            { lesson3: false },
            { lesson4: true },
        ],
    },
    {
        _id: userid_4,
        username: 'nutritionistmom',
        full_name: "Sophie Brown",
        email: "sophie.brown@example.com",
        password: "S0ph!3Br0wn",
        bookmarks: 10,
        progress: [
            { lesson1: true },
            { lesson2: true },
            { lesson3: true },
            { lesson4: false },
        ],
    },
    {
        _id: userid_5,
        username: 'newdad123',
        full_name: "Liam Smith",
        email: "liam.smith@example.com",
        password: "L1@msm!th",
        bookmarks: 20,
        progress: [
            { lesson1: true },
            { lesson2: false },
            { lesson3: true },
            { lesson4: true },
        ],
    },
];
