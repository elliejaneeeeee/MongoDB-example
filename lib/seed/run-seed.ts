import { seed } from "./seed";

export async function runSeed(
  usersData: any,
  flashcardsData: any,
  forumsData: any,
  articlesData: any
) {
  const run = await seed(usersData, flashcardsData, forumsData, articlesData);
  return run;
}
