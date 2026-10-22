'use client'

import React,{useState} from 'react'
import { registerAction } from '../serverActions/registerAction';
import Link from 'next/link';
const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerHandler=async(e) => {
        e.preventDefault();

        const userregisterdetails={
            username: username,
            email: email,
            password: password
        }
        console.log(userregisterdetails);
        try{
            const result=await registerAction(userregisterdetails);
            console.log(result);
            if(result.success){
                // Handle successful registration
                console.log("Registration successful!");
                alert("Registration successful! You can now log in.");
            } else {
                console.error("Registration failed:", result.message);
                alert(`Registration failed: ${result.message}`);
            }

        }catch(error){
            console.error('Error during registration:', error);
        }
    }

  return (
    <div className='formContainer'>
        <h1>Register Form</h1>
        <form onSubmit={registerHandler} className='formSection'>
            <h3>Username</h3>
            <input
                type="text" name="username" 
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <button type="submit">Register</button>
        </form>
        <Link href="/login">Already have an account? Log in</Link>
    </div>
  )
}

export default RegisterForm
