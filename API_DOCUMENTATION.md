# Resort Booking API Documentation

## Overview
This document outlines all the API endpoints available in the Resort Booking application.

## Base URL
- **Local Development**: `http://localhost:3000`
- **Production**: Your production domain

## API Endpoints

### Products

#### 1. Get All Products
- **URL**: `/api/products`
- **Method**: `GET`
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "product_id",
      "title": "Deluxe Room",
      "price": 150,
      "offer": 10,
      "amenities": "WiFi, AC, TV",
      "description": "Spacious room with modern amenities",
      "image": "base64_image_data",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### 2. Get Single Product
- **URL**: `/api/products/:id`
- **Method**: `GET`
- **Response**: Returns a single product object

#### 3. Add Product (Admin)
- **URL**: `/api/admin/add-product`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Form Fields**:
  - `title` (string, required)
  - `price` (number, required)
  - `offer` (number)
  - `amen` (string, required) - Amenities
  - `desc` (string, required) - Description
  - `image` (file, required)
- **Response**:
```json
{
  "success": true,
  "message": "Product added successfully",
  "productId": "new_product_id"
}
```

#### 4. Update Product (Admin)
- **URL**: `/api/products/:id`
- **Method**: `PUT`
- **Content-Type**: `multipart/form-data`
- **Form Fields**: Same as Add Product (all optional)
- **Response**: Returns updated product object

#### 5. Delete Product (Admin)
- **URL**: `/api/products/:id`
- **Method**: `DELETE`
- **Response**:
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### Bookings

#### 1. Create Booking
- **URL**: `/api/bookings`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "userId": "user_id",
  "productId": "product_id",
  "checkInDate": "2024-12-25",
  "checkOutDate": "2024-12-28",
  "numberOfGuests": 2,
  "totalPrice": 450,
  "specialRequests": "Late checkout preferred"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Booking created successfully",
  "bookingId": "new_booking_id"
}
```

#### 2. Get All Bookings (with optional filter)
- **URL**: `/api/bookings`
- **Method**: `GET`
- **Query Parameters**:
  - `userId` (optional) - Filter bookings by user
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "booking_id",
      "userId": { "username": "john", "email": "john@example.com" },
      "productId": { "title": "Deluxe Room", "price": 150 },
      "checkInDate": "2024-12-25",
      "checkOutDate": "2024-12-28",
      "numberOfGuests": 2,
      "totalPrice": 450,
      "specialRequests": "Late checkout preferred",
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Authentication

#### Sign Out
- **URL**: `/api/auth/signout`
- **Method**: `GET` or `POST`
- **Note**: This endpoint is handled by NextAuth.js

## Components Using APIs

### ProductsList
- Fetches all products from `/api/products`
- Displays products in a grid layout
- Usage: Import and use in any page

### BookingForm
- Creates bookings via `/api/bookings`
- Calculates total price based on nights and guests
- Usage: Import with `productId`, `userId`, `productPrice` props

### UserBookings
- Fetches user bookings from `/api/bookings?userId=`
- Displays booking history in a table
- Usage: Import with `userId` prop

## Utility Functions

Use `src/app/utils/api-client.js` for convenient API calls:

```javascript
import { productAPI, bookingAPI } from '@/app/utils/api-client';

// Get all products
const products = await productAPI.getAll();

// Get single product
const product = await productAPI.getById(productId);

// Create booking
const booking = await bookingAPI.create(bookingData);

// Get user bookings
const userBookings = await bookingAPI.getUserBookings(userId);
```

## Database Models

### Product Schema
```javascript
{
  title: String (required),
  price: Number (required),
  offer: Number (default: 0),
  amenities: String (required),
  description: String (required),
  image: String (required, base64),
  createdAt: Date (default: now)
}
```

### Booking Schema
```javascript
{
  userId: ObjectId (ref: User, required),
  productId: ObjectId (ref: Product, required),
  checkInDate: Date (required),
  checkOutDate: Date (required),
  numberOfGuests: Number (required),
  totalPrice: Number (required),
  specialRequests: String,
  status: String (enum: pending, confirmed, cancelled, completed, default: pending),
  createdAt: Date (default: now)
}
```

## Environment Variables

Add these to your `.env.local`:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## Error Responses

All endpoints return error responses in this format:
```json
{
  "success": false,
  "error": "Description of the error"
}
```

Status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Server Error
