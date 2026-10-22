import { NextResponse } from 'next/server';
import DBconnection from '@/app/utils/config/db';
import ProductModel from '@/app/utils/models/Product';

export async function GET(request, { params }) {
    try {
        await DBconnection();
        
        const { id } = params;
        
        const product = await ProductModel.findById(id);
        
        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { success: true, data: product },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching product:', error);
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
        const formData = await request.formData();
        
        const title = formData.get('title');
        const price = formData.get('price');
        const offer = formData.get('offer');
        const amenities = formData.get('amen');
        const description = formData.get('desc');
        const imageFile = formData.get('image');
        
        const updateData = {};
        
        if (title) updateData.title = title;
        if (price) updateData.price = parseFloat(price);
        if (offer) updateData.offer = parseFloat(offer);
        if (amenities) updateData.amenities = amenities;
        if (description) updateData.description = description;
        
        if (imageFile) {
            const buffer = await imageFile.arrayBuffer();
            const base64String = Buffer.from(buffer).toString('base64');
            const mimeType = imageFile.type || 'image/jpeg';
            updateData.image = `data:${mimeType};base64,${base64String}`;
        }
        
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        
        if (!updatedProduct) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { success: true, message: 'Product updated successfully', data: updatedProduct },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating product:', error);
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
        
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { success: true, message: 'Product deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
