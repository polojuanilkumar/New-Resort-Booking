import React from 'react'
import DBconnection from './utils/config/db'
import { auth } from './auth'
import { redirect } from 'next/navigation'
import UserNavigation from './components/UserNavigation'
import AdminPage from './Admin/page'

const HomePage = async() => {
  const session=await auth()
  await DBconnection();
  if(!session){
    redirect("/login");

  }
  const username=session.username;
  console.log("usercheck",username)
  return (
    <div>
      {session.role==='user' &&(
        <>
          <UserNavigation userName={username}/>
          <h1>Welcome to holiday resort booking</h1>
        </>

      )}
      {session.role==='admin' && <AdminPage/>}
      
    </div>
  )
}

export default HomePage
