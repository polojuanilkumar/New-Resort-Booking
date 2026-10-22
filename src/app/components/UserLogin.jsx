"use client"

import React,{useState} from 'react'
import { loginAction } from '../serverActions/loginAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const UserLogin = () => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState("");
     const router=useRouter();

     const loginHandler=async(e) => {
        e.preventDefault();     
        const logindetails={
            email: email,
            password: password
        }
        console.log(logindetails);
        try{
            const result=await loginAction(logindetails);
            if(result.success){
                router.push('/');

            }
            else{
                setError(result.message || "Login failed");
            }
            console.log(result);
        } catch (error) {
            setError(error.message);
            console.error('Error during login:', error);
        }
     }

  return (
    <div className='formContainer'>
        <h1>Login Form</h1>
       <form onSubmit={loginHandler} className='formSection'>
           {error && <p style={{ color: 'red' }}>{error}</p>}
            <h3>Email</h3>
            <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <h3>Password</h3>
            <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Login</button>
        </form>
         <Link href="/register">Don't have an account? Register</Link>
    </div>
  )
}

export default UserLogin
