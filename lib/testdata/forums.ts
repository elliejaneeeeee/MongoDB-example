interface comments {
    author: string,
    body: string,
    votes: number,
    date: Date
}

interface forums {
    title: string,
    body: string,
    author: string,
    votes: number,
    date: Date,
    comments: comments[]
}

export const forumsData: forums[] = [
    {
        title: "Tips for Getting Baby to Sleep Through the Night",
        body: "My 6-month-old is having trouble sleeping through the night. Any tips or strategies that have worked for you?",
        author: "newmom123",
        votes: 15,
        date: new Date("2024-05-01T10:00:00Z"),
        comments: [
            {
                author: "parentpro",
                body: "Try establishing a bedtime routine. Consistency is key!",
                votes: 10,
                date: new Date("2024-05-01T11:00:00Z")
            },
            {
                author: "sleepguru",
                body: "Make sure the room is dark and cool. White noise can also help.",
                votes: 8,
                date: new Date("2024-05-01T12:00:00Z")
            },
            {
                author: "dadlife",
                body: "We've had success with a warm bath and a story before bed.",
                votes: 7,
                date: new Date("2024-05-01T13:00:00Z")
            },
            {
                author: "momofthree",
                body: "Avoid feeding right before bed, it can sometimes disrupt sleep.",
                votes: 5,
                date: new Date("2024-05-01T14:00:00Z")
            },
            {
                author: "babywhisperer",
                body: "Be patient, some babies just take longer to adjust. Stay calm and consistent.",
                votes: 6,
                date: new Date("2024-05-01T15:00:00Z")
            }
        ]
    },
    {
        title: "When to Start Solid Foods?",
        body: "I’m unsure when to start introducing solid foods to my baby. Any advice?",
        author: "firsttimemom",
        votes: 20,
        date: new Date("2024-04-28T09:00:00Z"),
        comments: [
            {
                author: "nutritionistmom",
                body: "The recommended age is around 6 months. Start with single-ingredient purees.",
                votes: 12,
                date: new Date("2024-04-28T10:00:00Z")
            },
            {
                author: "dadoftwins",
                body: "Watch for signs of readiness like sitting up and showing interest in food.",
                votes: 10,
                date: new Date("2024-04-28T11:00:00Z")
            },
            {
                author: "healthybaby",
                body: "Avoid honey and cow’s milk until after the first year.",
                votes: 8,
                date: new Date("2024-04-28T12:00:00Z")
            },
            {
                author: "veganmom",
                body: "Introduce vegetables before fruits to avoid a preference for sweet foods.",
                votes: 7,
                date: new Date("2024-04-28T13:00:00Z")
            },
            {
                author: "milkmom",
                body: "Breastfeed or formula-feed first, then offer solids to ensure they get enough nutrition.",
                votes: 9,
                date: new Date("2024-04-28T14:00:00Z")
            }
        ]
    },
    {
        title: "Dealing with Colic",
        body: "My baby seems to be colicky. What are some ways to soothe a colicky baby?",
        author: "tiredmom",
        votes: 18,
        date: new Date("2024-05-03T08:00:00Z"),
        comments: [
            {
                author: "colicexpert",
                body: "Swaddling and rocking can help soothe a colicky baby.",
                votes: 11,
                date: new Date("2024-05-03T09:00:00Z")
            },
            {
                author: "daddydaycare",
                body: "Try using a pacifier or going for a drive. The motion often helps.",
                votes: 9,
                date: new Date("2024-05-03T10:00:00Z")
            },
            {
                author: "mamabear",
                body: "White noise machines or a vacuum cleaner can sometimes calm them down.",
                votes: 8,
                date: new Date("2024-05-03T11:00:00Z")
            },
            {
                author: "nannycare",
                body: "Holding your baby upright during and after feeding can reduce colic symptoms.",
                votes: 7,
                date: new Date("2024-05-03T12:00:00Z")
            },
            {
                author: "pediatricnurse",
                body: "Consult your pediatrician to rule out any underlying issues.",
                votes: 10,
                date: new Date("2024-05-03T13:00:00Z")
            }
        ]
    },
    {
        title: "Best Toys for Baby's Development",
        body: "What are some of the best toys for supporting my baby's development?",
        author: "toylovingmom",
        votes: 22,
        date: new Date("2024-05-05T10:00:00Z"),
        comments: [
            {
                author: "earlyeducator",
                body: "Simple toys like stacking blocks and shape sorters are great for motor skills.",
                votes: 14,
                date: new Date("2024-05-05T11:00:00Z")
            },
            {
                author: "toyenthusiast",
                body: "Soft books with different textures can engage their senses.",
                votes: 11,
                date: new Date("2024-05-05T12:00:00Z")
            },
            {
                author: "newdad",
                body: "Musical toys can help with auditory development.",
                votes: 10,
                date: new Date("2024-05-05T13:00:00Z")
            },
            {
                author: "momof4",
                body: "Tummy time mats with attached toys encourage reaching and grabbing.",
                votes: 9,
                date: new Date("2024-05-05T14:00:00Z")
            },
            {
                author: "childpsych",
                body: "Interactive toys that respond to baby's actions help with cause and effect learning.",
                votes: 12,
                date: new Date("2024-05-05T15:00:00Z")
            }
        ]
    },
    {
        title: "Coping with Postpartum Depression",
        body: "I think I might be experiencing postpartum depression. What should I do?",
        author: "strugglingmom",
        votes: 30,
        date: new Date("2024-05-07T09:00:00Z"),
        comments: [
            {
                author: "mentalhealthadvocate",
                body: "It's important to talk to a healthcare professional. Therapy and support groups can help.",
                votes: 20,
                date: new Date("2024-05-07T10:00:00Z")
            },
            {
                author: "supportivemom",
                body: "You are not alone. Reach out to family and friends for support.",
                votes: 18,
                date: new Date("2024-05-07T11:00:00Z")
            },
            {
                author: "newdad2",
                body: "Encourage your partner to help out more and give you time to rest.",
                votes: 15,
                date: new Date("2024-05-07T12:00:00Z")
            },
            {
                author: "selfcareguru",
                body: "Make sure to take care of yourself. Eat well, stay hydrated, and get some fresh air.",
                votes: 17,
                date: new Date("2024-05-07T13:00:00Z")
            },
            {
                author: "pediatrician",
                body: "Postpartum depression is common and treatable. Seeking help is a strong first step.",
                votes: 19,
                date: new Date("2024-05-07T14:00:00Z")
            }
        ]
    }
];
