"use client"

import React, { useState } from 'react'
import admin from './components.module.css'

const BookingForm = ({ productId, userId, productPrice }) => {
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [specialRequests, setSpecialRequests] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const calculateTotalPrice = () => {
        if (!checkInDate || !checkOutDate) return 0;
        
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        
        return nights > 0 ? nights * productPrice * numberOfGuests : 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(`/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    productId,
                    checkInDate,
                    checkOutDate,
                    numberOfGuests: parseInt(numberOfGuests),
                    totalPrice: calculateTotalPrice(),
                    specialRequests
                })
            });

            const result = await response.json();

            if (result.success) {
                setMessage("Booking created successfully!");
                setCheckInDate("");
                setCheckOutDate("");
                setNumberOfGuests(1);
                setSpecialRequests("");
            } else {
                setMessage(`Error: ${result.error}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            console.error('Error creating booking:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={admin.container}>
            <h2>Make a Booking</h2>
            {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
            
            <form onSubmit={handleSubmit}>
                <div className={admin.fields}>
                    <div>
                        <h3>Check-In Date</h3>
                        <input 
                            type="date" 
                            value={checkInDate} 
                            onChange={(e) => setCheckInDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <h3>Check-Out Date</h3>
                        <input 
                            type="date" 
                            value={checkOutDate} 
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={admin.fields}>
                    <div>
                        <h3>Number of Guests</h3>
                        <input 
                            type="number" 
                            min="1" 
                            value={numberOfGuests} 
                            onChange={(e) => setNumberOfGuests(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3>Total Price</h3>
                        <input 
                            type="number" 
                            value={calculateTotalPrice()} 
                            disabled
                            readOnly
                        />
                    </div>
                </div>

                <div className={admin.textField}>
                    <h3>Special Requests</h3>
                    <textarea 
                        rows="4" 
                        value={specialRequests} 
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Any special requests for your stay..."
                    />
                </div>

                <div className={admin.submit}>
                    <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Complete Booking"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
