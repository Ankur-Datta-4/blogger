export { default } from "next-auth/middleware";

export const config = { matcher: ["/[userSlug]/dash", "/[userSlug]"] };
