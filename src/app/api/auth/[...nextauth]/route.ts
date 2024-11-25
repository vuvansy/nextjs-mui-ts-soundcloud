import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { AuthOptions } from 'next-auth';
import { sendRequest } from "../../../../utils/api";
import async from '../../../page';

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
       async jwt({ token, user, account, profile, trigger }) {
            if (trigger === "signIn" && account?.provider === "github") {
                
            }
            return token;
        },
        session({ session, token, user }) {
            
            return session;
        }
    }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }