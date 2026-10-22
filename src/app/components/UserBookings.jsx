"use client"

import React, { useState, useEffect } from 'react'
import admin from './components.module.css'

const UserBookings = ({ userId }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`/api/bookings?userId=${userId}`);
                const result = await response.json();
                
                if (result.success) {
                    setBookings(result.data);
                } else {
                    setError(result.error || "Failed to fetch bookings");
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching bookings:', err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchBookings();
        }
    }, [userId]);

    if (loading) return <div>Loading your bookings...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div className={admin.container}>
            <h1>Your Bookings</h1>
            
            {bookings.length === 0 ? (
                <p>You have no bookings yet.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Room</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Check-In</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Check-Out</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Guests</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Total Price</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    {booking.productId?.title}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    {new Date(booking.checkInDate).toLocaleDateString()}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    {new Date(booking.checkOutDate).toLocaleDateString()}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    {booking.numberOfGuests}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    ${booking.totalPrice}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    <span style={{
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        backgroundColor: booking.status === 'confirmed' ? '#d4edda' : '#f8d7da',
                                        color: booking.status === 'confirmed' ? '#155724' : '#856404'
                                    }}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserBookings;
