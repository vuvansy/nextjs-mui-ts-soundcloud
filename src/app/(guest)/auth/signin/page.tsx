import AuthSignIn from "@/components/auth/auth.signin"
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SignInPage = async () => {
    const session = await getServerSession(authOptions);
    //Nếu người dùng đăng nhập rồi thì đẩy người dùng về home
    if (session) {
        // redirect to homepage
        redirect("/")
    }
    return (
        <AuthSignIn />

    )
}
export default SignInPage;