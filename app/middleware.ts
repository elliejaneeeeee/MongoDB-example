export { default } from "next-auth/middleware";

// pages in the matcher array cannot be accessed if not logged in
export const config = { matcher: ["/profile"] };
