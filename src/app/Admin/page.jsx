import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '../auth'
import Link from 'next/link'
import AdminNavbar from '../components/AdminNavbar'

const AdminPage = async() => {
    const session=await auth()
    if(!session){
        redirect("/login");

    }
  return (
    <div>
        {session ? (
            <>
            <AdminNavbar/>
            <h1>This is Admin Page</h1>
            </>

        ):"Not Authorized"
        }
        <Link href="/login">
            Login
        </Link>
    </div>
  )
}

export default AdminPage
