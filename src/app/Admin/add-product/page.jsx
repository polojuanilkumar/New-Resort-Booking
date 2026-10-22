import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '../../auth'
import AddProduct from '../../components/AddProduct'
import AdminNavbar from '../../components/AdminNavbar'

const AddProductPage = async () => {
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
                <AddProduct />
            </div>
        </div>
    )
}

export default AddProductPage
