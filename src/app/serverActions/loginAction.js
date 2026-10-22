"use server"
import DBconnection from "../utils/config/db";
import UserModel from "../utils/models/User";
import { signIn } from "../auth";
export async function loginAction(loginDetails) {
    await DBconnection();  
    try {
        const response=await signIn('credentials',{
            email: loginDetails.email,
            password: loginDetails.password,
            redirect:false
        })
        return {success:true}
    } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Login failed');
    }   

}