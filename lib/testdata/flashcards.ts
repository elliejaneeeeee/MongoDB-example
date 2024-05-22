import { ObjectId } from "mongodb";

interface flashcards {
    _id: ObjectId;
    unit: number;
    section: string;
    title: string;
    body: string[];
    img_url: string;
}

const flashcardid_1: ObjectId = new ObjectId("664db207509cc0afb30cc36e");
const flashcardid_2: ObjectId = new ObjectId("664db209509cc0afb30cc36f");
const flashcardid_3: ObjectId = new ObjectId("664db20a509cc0afb30cc370");
const flashcardid_4: ObjectId = new ObjectId("664db20b509cc0afb30cc371");
const flashcardid_5: ObjectId = new ObjectId("664db20c509cc0afb30cc372");

export const flashcardsData: flashcards[] = [
    {
        _id: flashcardid_1,
        unit: 1,
        section: "0-2 months",
        title: "Positive Reinforcement",
        body: [
            "Positive reinforcement involves rewarding your child for good behavior to encourage it to continue.",
            "Examples include praise, extra playtime, or a small treat.",
            "Consistency is key in ensuring the effectiveness of positive reinforcement.",
        ],
        img_url:
            "https://images.pexels.com/photos/236164/pexels-photo-236164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        _id: flashcardid_2,
        unit: 2,
        section: "2-4 months",
        title: "Setting Boundaries",
        body: [
            "Clear and consistent boundaries help children understand expectations and consequences.",
            "Be firm but fair, and explain the reasons behind the rules.",
            "Consistent enforcement of boundaries is crucial for effectiveness.",
        ],
        img_url:
            "https://images.pexels.com/photos/1684038/pexels-photo-1684038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        _id: flashcardid_3,
        unit: 3,
        section: "4-6 months",
        title: "Active Listening",
        body: [
            "Active listening involves giving your full attention to your child when they speak.",
            "Show empathy by reflecting back what they say and acknowledging their feelings.",
            "This builds trust and improves communication.",
        ],
        img_url:
            "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        _id: flashcardid_4,
        unit: 4,
        section: "6-8 months",
        title: "Encouraging Independence",
        body: [
            "Allowing children to make choices and take on responsibilities fosters independence.",
            "Offer age-appropriate tasks and gradually increase their complexity as your child grows.",
            "Encourage problem-solving and provide guidance when necessary.",
        ],
        img_url:
            "https://images.pexels.com/photos/1166990/pexels-photo-1166990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        _id: flashcardid_5,
        unit: 5,
        section: "8-10 months",
        title: "Healthy Routines",
        body: [
            "Establishing regular routines helps children feel secure and understand what is expected of them.",
            "Routines can include bedtime, meal times, and homework schedules.",
            "Consistency in routines supports better behavior and emotional regulation.",
        ],
        img_url:
            "https://images.pexels.com/photos/4145347/pexels-photo-4145347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
];
