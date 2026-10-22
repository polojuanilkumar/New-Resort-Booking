import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '../../auth'
import AdminNavbar from '../../components/AdminNavbar'
import ProductsList from '../../components/ProductsList'

const AdminProductsPage = async () => {
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
                <h1>All Products</h1>
                <ProductsList />
            </div>
        </div>
    )
}

export default AdminProductsPage
