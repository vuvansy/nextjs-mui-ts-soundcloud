import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
    secret: process.env.NO_SECRET,
    // Configure one or more authentication providers
    //Khai báo nhà cung cấp dịch vụ login: github, fb, gg...
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        jwt({ token, user, account, profile, trigger }) {
            if (trigger === "signIn" && account?.provider === "github") {
                //todo
                token.address = "hoi dan it"
            }
            return token;
        },
        session({ session, token, user }) {
            //@ts-ignore
            session.address = token.address;
            return session;
        }
    }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }