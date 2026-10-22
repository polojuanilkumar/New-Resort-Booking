import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '../../auth'
import UserNavigation from '../../components/UserNavigation'
import UserBookings from '../../components/UserBookings'

const UserBookingsPage = async () => {
    const session = await auth()
    
    if (!session) {
        redirect("/login");
    }

    if (session.role !== 'user') {
        redirect("/");
    }

    return (
        <div>
            <UserNavigation userName={session.username} />
            <div style={{ padding: '20px' }}>
                <UserBookings userId={session.userid} />
            </div>
        </div>
    )
}

export default UserBookingsPage
