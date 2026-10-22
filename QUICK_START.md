# Quick Start Guide - Resort Booking API

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create `.env.local` file in project root:
```
MONGODB_URI=mongodb://your_connection_string
NEXTAUTH_SECRET=generate_using: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
```

### 3. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:3000`

## API Testing

### Add Product (Admin)
```bash
curl -X POST http://localhost:3000/api/admin/add-product \
  -F "title=Deluxe Room" \
  -F "price=150" \
  -F "offer=10" \
  -F "amen=WiFi, AC, TV" \
  -F "desc=Spacious room" \
  -F "image=@path/to/image.jpg"
```

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Create Booking
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id",
    "productId": "product_id",
    "checkInDate": "2024-12-25",
    "checkOutDate": "2024-12-28",
    "numberOfGuests": 2,
    "totalPrice": 450
  }'
```

### Get User Bookings
```bash
curl "http://localhost:3000/api/bookings?userId=user_id"
```

## Component Integration

### Show Products on Home Page
```jsx
import ProductsList from '@/app/components/ProductsList';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <ProductsList />
    </div>
  );
}
```

### Booking Flow
1. User selects product from ProductsList
2. ProductsList displays product details with "Book Now" button
3. Clicking "Book Now" opens BookingForm component
4. BookingForm collects dates, guests, requests
5. Form submission sends POST to `/api/bookings`
6. Confirmation shows booking created
7. User can view bookings in UserBookings component

## Database Models

### User Schema (Existing)
```javascript
{
  username: String,
  email: String (unique),
  password: String,
  role: String (default: 'user'),
  bookings: [ObjectId]
}
```

### Product Schema (New)
```javascript
{
  title: String,
  price: Number,
  offer: Number,
  amenities: String,
  description: String,
  image: String (base64),
  createdAt: Date
}
```

### Booking Schema (New)
```javascript
{
  userId: ObjectId (ref: User),
  productId: ObjectId (ref: Product),
  checkInDate: Date,
  checkOutDate: Date,
  numberOfGuests: Number,
  totalPrice: Number,
  specialRequests: String,
  status: String,
  createdAt: Date
}
```

## Common Tasks

### Add New Product
1. Navigate to Admin Panel
2. Click "Add Record"
3. Fill form details
4. Upload image
5. Click Submit

### Check Bookings (User)
1. Login as user
2. Navigate to Bookings
3. View your reservation history
4. See confirmation status

### Manage Bookings (Admin)
1. Login as admin
2. Go to Admin Panel
3. View all bookings
4. Update status (pending → confirmed)
5. Delete if needed

## Troubleshooting

### MongoDB Connection Error
- Check MONGODB_URI format
- Ensure MongoDB is running
- Verify connection string is correct

### Image Upload Issues
- Check file size (should be reasonable)
- Ensure image format is supported (jpg, png, etc)
- Check file permissions

### Booking Creation Failed
- Verify userId exists
- Verify productId exists
- Check date format (YYYY-MM-DD)
- Ensure totalPrice is a number

### API Returns 404
- Check endpoint URL spelling
- Verify resource ID exists
- Check request method (GET/POST/PUT/DELETE)

## Performance Tips

1. **Product Images**: Consider moving to cloud storage for large images
2. **Pagination**: Add pagination to products list for large datasets
3. **Caching**: Implement Redis caching for frequently accessed products
4. **Search**: Add full-text search for bookings and products
5. **Validation**: Add more client-side validation for better UX

## Security Considerations

1. ✓ Auth already in place with NextAuth
2. Add role-based access control for admin endpoints
3. Add rate limiting for API endpoints
4. Validate all user inputs on backend
5. Add HTTPS in production
6. Sanitize image uploads
7. Add request logging

## Documentation Files

- `API_DOCUMENTATION.md` - Complete API reference
- `IMPLEMENTATION_SUMMARY.md` - All changes and additions
- `QUICK_START.md` - This file

For more details, see API_DOCUMENTATION.md
