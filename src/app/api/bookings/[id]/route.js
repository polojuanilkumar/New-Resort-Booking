import { NextResponse } from 'next/server';
import DBconnection from '@/app/utils/config/db';
import BookingModel from '@/app/utils/models/Booking';

export async function GET(request, { params }) {
    try {
        await DBconnection();
        
        const { id } = params;
        
        const booking = await BookingModel.findById(id)
            .populate('productId')
            .populate('userId', 'username email');
        
        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { success: true, data: booking },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching booking:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        await DBconnection();
        
        const { id } = params;
        const body = await request.json();
        
        const allowedUpdates = ['status', 'specialRequests'];
        const updates = {};
        
        Object.keys(body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updates[key] = body[key];
            }
        });
        
        const updatedBooking = await BookingModel.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        ).populate('productId').populate('userId', 'username email');
        
        if (!updatedBooking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { success: true, message: 'Booking updated successfully', data: updatedBooking },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        await DBconnection();
        
        const { id } = params;
        
        const deletedBooking = await BookingModel.findByIdAndDelete(id);
        
        if (!deletedBooking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { success: true, message: 'Booking deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting booking:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
