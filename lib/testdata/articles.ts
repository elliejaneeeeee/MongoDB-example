import { ObjectId } from "mongodb";
import { articles } from "@/types";

const articleid_1: ObjectId = new ObjectId("664d9e9f509cc0afb30cc369");
const articleid_2: ObjectId = new ObjectId("664daab1509cc0afb30cc36a");
const articleid_3: ObjectId = new ObjectId("664daab2509cc0afb30cc36b");
const articleid_4: ObjectId = new ObjectId("664daab3509cc0afb30cc36c");
const articleid_5: ObjectId = new ObjectId("664daab4509cc0afb30cc36d");

export const articlesData: articles[] = [
    {
        _id: articleid_1,
        title: "The Importance of Tummy Time",
        link: "https://safetosleep.nichd.nih.gov/reduce-risk/tummy-time",
        img_url:
            "https://images.pexels.com/photos/3875132/pexels-photo-3875132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        body: "Tummy time is essential for your baby's development. It helps strengthen neck, shoulder, and arm muscles, and prevents the back of their head from becoming flat. Aim for several short sessions each day, gradually increasing the time as your baby gets stronger. Always supervise tummy time and make it fun by engaging with toys or laying down face-to-face with your baby.",
        source: "US Dpt. Health & Human Services",
    },
    {
        _id: articleid_2,
        title: "Establishing a Sleep Routine for Your Baby",
        link: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/",
        img_url:
            "https://images.pexels.com/photos/161709/newborn-baby-feet-basket-161709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        body: "Creating a consistent sleep routine is crucial for your baby's health and well-being. Start with a calming bedtime routine, such as a warm bath, gentle massage, and reading a story. Keep the sleep environment dark, quiet, and cool. Aim for regular sleep and wake times to help regulate your baby's internal clock.",
        source: "NHS",
    },
    {
        _id: articleid_3,
        title: "Breastfeeding Basics",
        link: "https://www.cdc.gov/nutrition/infantandtoddlernutrition/breastfeeding/newborn-breastfeeding-basics.html#:~:text=Make%20sure%20your%20baby%20has,as%20your%20baby%20normally%20eats.",
        img_url:
            "https://images.pexels.com/photos/3763580/pexels-photo-3763580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        body: "Breastfeeding provides numerous health benefits for both baby and mother. Ensure a good latch by aligning your baby's nose with your nipple and supporting their head. Feed on demand, typically 8-12 times in 24 hours. Stay hydrated and maintain a healthy diet to support milk production.",
        source: "CDC",
    },
    {
        _id: articleid_4,
        title: "Introducing Solid Foods to Your Baby",
        link: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/",
        img_url:
            "https://images.pexels.com/photos/2869318/pexels-photo-2869318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        body: "Around 6 months of age, your baby may be ready to start solid foods. Begin with single-ingredient purees and gradually introduce a variety of fruits, vegetables, and grains. Watch for signs of readiness, such as sitting up with support and showing interest in food. Avoid honey and cow's milk until after the first year.",
        source: "NHS",
    },
    {
        _id: articleid_5,
        title: "Keeping Your Child Safe Online",
        link: "https://www.bbc.co.uk/news/technology-68225707",
        img_url:
            "https://images.pexels.com/photos/3975669/pexels-photo-3975669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        body: "Technology companies will have to take more action to keep children safe on the internet, following the introduction of the Online Safety Act.",
        source: "BBC News",
    },
];
