
import connect from "../lib/index";

export async function getFlashcardByID(id: string) {
  const unitNumber = Number(id);
  if (isNaN(unitNumber)) {
    return Promise.reject({ msg: "Bad Request", status: 400 }); //throws error to be caught in route.ts
  }
  const client = await connect();
  const db = client.db("test");
  const flashcards = await db
    .collection("flashcards")
    .find({ unit: unitNumber })
    .toArray(); 
  if (flashcards.length === 0) {
    return Promise.reject({ msg: "Not Found", status: 404 }); //throws error to be caught in route.ts
  }
  return flashcards;
}
