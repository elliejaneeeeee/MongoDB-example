import { seed } from "./seed";
import { articlesData } from "@/lib/testdata/articles";
import { flashcardsData } from "@/lib/testdata/flashcards";
import { forumsData } from "@/lib/testdata/forums";
import { usersData } from "@/lib/testdata/users";

export async function runSeed(
  usersData: any,
  flashcardsData: any,
  forumsData: any,
  articlesData: any
) {
  const run = await seed(usersData, flashcardsData, forumsData, articlesData);
  return run;
}
