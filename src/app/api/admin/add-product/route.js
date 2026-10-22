import { NextResponse } from 'next/server';
import DBconnection from '@/app/utils/config/db';
import ProductModel from '@/app/utils/models/Product';

export async function POST(request) {
    try {
        // Connect to database
        await DBconnection();

        // Parse form data
        const formData = await request.formData();
        
        const title = formData.get('title');
        const price = formData.get('price');
        const offer = formData.get('offer');
        const amenities = formData.get('amen');
        const description = formData.get('desc');
        const imageFile = formData.get('image');

        // Validate required fields
        if (!title || !price || !amenities || !description) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Handle image upload
        let imageData = '';
        if (imageFile) {
            const buffer = await imageFile.arrayBuffer();
            const base64String = Buffer.from(buffer).toString('base64');
            const mimeType = imageFile.type || 'image/jpeg';
            imageData = `data:${mimeType};base64,${base64String}`;
        }

        // Create new product
        const newProduct = new ProductModel({
            title,
            price: parseFloat(price),
            offer: offer ? parseFloat(offer) : 0,
            amenities,
            description,
            image: imageData
        });

        // Save to database
        await newProduct.save();

        return NextResponse.json(
            { 
                success: true, 
                message: 'Product added successfully',
                productId: newProduct._id 
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error adding product:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
