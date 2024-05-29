import { ObjectId } from "mongodb";

interface comments {
    _id: ObjectId;
    author: string;
    body: string;
    votes: number;
    date: Date;
}

interface forums {
    _id: ObjectId;
    title: string;
    body: string;
    author: string;
    votes: number;
    date: Date;
    comments: comments[];
}

const forumid_1: ObjectId = new ObjectId("664db45a509cc0afb30cc373");
const forumid_2: ObjectId = new ObjectId("664db45c509cc0afb30cc374");
const forumid_3: ObjectId = new ObjectId("664db45d509cc0afb30cc375");
const forumid_4: ObjectId = new ObjectId("664db460509cc0afb30cc376");
const forumid_5: ObjectId = new ObjectId("664db460509cc0afb30cc377");

const commentid_1: ObjectId = new ObjectId("664db4cf509cc0afb30cc378");
const commentid_2: ObjectId = new ObjectId("664db4d0509cc0afb30cc379");
const commentid_3: ObjectId = new ObjectId("664db4d3509cc0afb30cc37a");
const commentid_4: ObjectId = new ObjectId("664db4d4509cc0afb30cc37b");
const commentid_5: ObjectId = new ObjectId("664db4d4509cc0afb30cc37c");
const commentid_6: ObjectId = new ObjectId("664db4d5509cc0afb30cc37d");
const commentid_7: ObjectId = new ObjectId("664db4d5509cc0afb30cc37e");
const commentid_8: ObjectId = new ObjectId("664db4d6509cc0afb30cc37f");
const commentid_9: ObjectId = new ObjectId("664db4d6509cc0afb30cc380");
const commentid_10: ObjectId = new ObjectId("664db4d7509cc0afb30cc381");

export const forumsData: forums[] = [
    {
        _id: forumid_1,
        title: "Tips for Getting Baby to Sleep Through the Night",
        body: "My 6-month-old is having trouble sleeping through the night. Any tips or strategies that have worked for you?",
        author: "newmom123",
        votes: 15,
        date: new Date("2024-05-01T10:00:00Z"),
        comments: [
            {
                _id: commentid_1,
                author: "parentpro",
                body: "Try establishing a bedtime routine. Consistency is key!",
                votes: 10,
                date: new Date("2024-05-01T11:00:00Z"),
            },
            {
                _id: commentid_2,
                author: "sleepguru",
                body: "Make sure the room is dark and cool. White noise can also help.",
                votes: 8,
                date: new Date("2024-05-01T12:00:00Z"),
            },
        ],
    },
    {
        _id: forumid_2,
        title: "When to Start Solid Foods?",
        body: "I'm unsure when to start introducing solid foods to my baby. Any advice?",
        author: "firsttimemom",
        votes: 20,
        date: new Date("2024-04-28T09:00:00Z"),
        comments: [
            {
                _id: commentid_3,
                author: "nutritionistmom",
                body: "The recommended age is around 6 months. Start with single-ingredient purees.",
                votes: 12,
                date: new Date("2024-04-28T10:00:00Z"),
            },
            {
                _id: commentid_4,
                author: "dadoftwins",
                body: "Watch for signs of readiness like sitting up and showing interest in food.",
                votes: 10,
                date: new Date("2024-04-28T11:00:00Z"),
            },
        ],
    },
    {
        _id: forumid_3,
        title: "Dealing with Colic",
        body: "My baby seems to be colicky. What are some ways to soothe a colicky baby?",
        author: "tiredmom",
        votes: 18,
        date: new Date("2024-05-03T08:00:00Z"),
        comments: [
            {
                _id: commentid_5,
                author: "colicexpert",
                body: "Swaddling and rocking can help soothe a colicky baby.",
                votes: 11,
                date: new Date("2024-05-03T09:00:00Z"),
            },
            {
                _id: commentid_6,
                author: "daddydaycare",
                body: "Try using a pacifier or going for a drive. The motion often helps.",
                votes: 9,
                date: new Date("2024-05-03T10:00:00Z"),
            },
        ],
    },
    {
        _id: forumid_4,
        title: "Best Toys for Baby's Development",
        body: "What are some of the best toys for supporting my baby's development?",
        author: "toylovingmom",
        votes: 22,
        date: new Date("2024-05-05T10:00:00Z"),
        comments: [
            {
                _id: commentid_7,
                author: "earlyeducator",
                body: "Simple toys like stacking blocks and shape sorters are great for motor skills.",
                votes: 14,
                date: new Date("2024-05-05T11:00:00Z"),
            },
            {
                _id: commentid_8,
                author: "toyenthusiast",
                body: "Soft books with different textures can engage their senses.",
                votes: 11,
                date: new Date("2024-05-05T12:00:00Z"),
            },
        ],
    },
    {
        _id: forumid_5,
        title: "Coping with Postpartum Depression",
        body: "I think I might be experiencing postpartum depression. What should I do?",
        author: "strugglingmom",
        votes: 30,
        date: new Date("2024-05-07T09:00:00Z"),
        comments: [
            {
                _id: commentid_9,
                author: "mentalhealthadvocate",
                body: "It's important to talk to a healthcare professional. Therapy and support groups can help.",
                votes: 20,
                date: new Date("2024-05-07T10:00:00Z"),
            },
            {
                _id: commentid_10,
                author: "supportivemom",
                body: "You are not alone. Reach out to family and friends for support.",
                votes: 18,
                date: new Date("2024-05-07T11:00:00Z"),
            },
        ],
    },
];
