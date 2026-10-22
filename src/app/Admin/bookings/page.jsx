import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '../../auth'
import AdminNavbar from '../../components/AdminNavbar'
import ManageBookings from '../../components/ManageBookings'

const AdminBookingsPage = async () => {
    const session = await auth()
    
    if (!session) {
        redirect("/login");
    }

    if (session.role !== 'admin') {
        redirect("/");
    }

    return (
        <div>
            <AdminNavbar />
            <div style={{ padding: '20px' }}>
                <ManageBookings />
            </div>
        </div>
    )
}

export default AdminBookingsPage
