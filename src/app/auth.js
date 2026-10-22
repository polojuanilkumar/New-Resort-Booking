import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/app/utils/models/User";
export const {auth,signIn,signOut,handlers:{GET,POST}}=NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                const user = await UserModel.findOne({ email: credentials?.email });
                if(!user){
                    return null;

                }
                if(credentials?.password !== user.password){
                    return null;
                }
                return { name:user.username, email:user.email ,role:user.role};
            }
        })

    ],
    secret:process.env.SECRETE_KEY,
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.userid=user.id;
                token.username=user.name;
                token.role=user.role;
                token.email=user.email;
            }
            return token;
        },
        async session({session,token}){
            if(token){
                session.userid=token.userid;
                session.username=token.username;
                session.role=token.role;
                session.email=token.email;
                return session;
            }
        }
    }



})