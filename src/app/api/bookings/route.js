import { NextResponse } from 'next/server';
import DBconnection from '@/app/utils/config/db';
import BookingModel from '@/app/utils/models/Booking';
import ProductModel from '@/app/utils/models/Product';

export async function POST(request) {
    try {
        await DBconnection();
        
        const body = await request.json();
        
        const {
            userId,
            productId,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            totalPrice,
            specialRequests
        } = body;
        
        // Validate required fields
        if (!userId || !productId || !checkInDate || !checkOutDate || !numberOfGuests || !totalPrice) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }
        
        // Verify product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }
        
        // Create booking
        const newBooking = new BookingModel({
            userId,
            productId,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            numberOfGuests,
            totalPrice,
            specialRequests: specialRequests || ''
        });
        
        await newBooking.save();
        
        return NextResponse.json(
            { success: true, message: 'Booking created successfully', bookingId: newBooking._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        await DBconnection();
        
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        
        let query = {};
        if (userId) {
            query.userId = userId;
        }
        
        const bookings = await BookingModel.find(query)
            .populate('productId', 'title price amenities')
            .populate('userId', 'username email');
        
        return NextResponse.json(
            { success: true, data: bookings },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
