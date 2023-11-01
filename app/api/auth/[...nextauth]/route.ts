import googleAuth from "../../../../lib/auth/googleAuth";
import NextAuth from "next-auth/next";

const handler = googleAuth;

export { handler as GET, handler as POST};