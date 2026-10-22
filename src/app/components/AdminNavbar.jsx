

import React from 'react'
import Link from 'next/link'
const AdminNavbar = () => {
  return (
    <div className='navSection'>
        <div className="title">
        <Link href="/" className="link">
            <h2>Holiday Resort</h2>
        </Link>
        </div>
    
        <div style={{ display: 'flex', gap: '20px', margin: '10px 0' }}>
          <Link href="/Admin/add-product" className='link'>
            <div style={{ cursor: 'pointer' }}>Add Product</div>
          </Link>
          <Link href="/Admin/products" className='link'>
            <div style={{ cursor: 'pointer' }}>View Products</div>
          </Link>
          <Link href="/Admin/bookings" className='link'>
            <div style={{ cursor: 'pointer' }}>Manage Bookings</div>
          </Link>
        </div>

        <p>Welcome: Admin</p>
        <Link href="/api/auth/signout" className='link'>
        <div className="logout">
            Logout
        </div>
        </Link>
    </div>
  )
}

export default AdminNavbar
