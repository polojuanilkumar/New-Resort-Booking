import { NextResponse } from 'next/server';
import DBconnection from '@/app/utils/config/db';
import ProductModel from '@/app/utils/models/Product';

export async function GET(request) {
    try {
        await DBconnection();
        
        const products = await ProductModel.find().select('-image');
        
        return NextResponse.json(
            { success: true, data: products },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
