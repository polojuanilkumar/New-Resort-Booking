"use client"

import React, { useState, useEffect } from 'react'
import admin from './components.module.css'

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch(`/api/bookings`);
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

    const handleStatusChange = async (bookingId, currentStatus) => {
        const status = prompt(`Enter new status (current: ${currentStatus}):`, currentStatus);
        
        if (!status) return;

        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            const result = await response.json();

            if (result.success) {
                setError("");
                alert("Booking status updated successfully!");
                fetchBookings();
            } else {
                setError(`Error: ${result.error}`);
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
            console.error('Error updating booking:', err);
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;

        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (result.success) {
                setError("");
                alert("Booking deleted successfully!");
                fetchBookings();
            } else {
                setError(`Error: ${result.error}`);
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
            console.error('Error deleting booking:', err);
        }
    };

    if (loading) return <div>Loading bookings...</div>;

    return (
        <div className={admin.container}>
            <h1>Manage Bookings</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>User</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Room</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Check-In</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Check-Out</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Price</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Status</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    {booking.userId?.username}
                                </td>
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
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    <button 
                                        onClick={() => handleStatusChange(booking._id, booking.status)}
                                        style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        Edit Status
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteBooking(booking._id)}
                                        style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#f8d7da', color: '#856404' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageBookings;
