import { articles, flashcards, forums, users } from "@/types";
import { seed } from "./seed";

export async function runSeed(
  usersData: users[],
  flashcardsData: flashcards[],
  forumsData: forums[],
  articlesData: articles[]
) {
  const run = await seed(usersData, flashcardsData, forumsData, articlesData);
  return run;
}
