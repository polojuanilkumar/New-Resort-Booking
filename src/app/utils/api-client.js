// API utility functions for making requests to backend endpoints

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

// Product APIs
export const productAPI = {
    // Get all products
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE}/api/products`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Get single product by ID
    getById: async (productId) => {
        try {
            const response = await fetch(`${API_BASE}/api/products/${productId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    // Add new product (admin)
    create: async (formData) => {
        try {
            const response = await fetch(`${API_BASE}/api/admin/add-product`, {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    // Update product (admin)
    update: async (productId, formData) => {
        try {
            const response = await fetch(`${API_BASE}/api/products/${productId}`, {
                method: 'PUT',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    // Delete product (admin)
    delete: async (productId) => {
        try {
            const response = await fetch(`${API_BASE}/api/products/${productId}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
};

// Booking APIs
export const bookingAPI = {
    // Create booking
    create: async (bookingData) => {
        try {
            const response = await fetch(`${API_BASE}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    },

    // Get bookings (optionally filtered by userId)
    getAll: async (userId = null) => {
        try {
            const url = userId 
                ? `${API_BASE}/api/bookings?userId=${userId}`
                : `${API_BASE}/api/bookings`;
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching bookings:', error);
            throw error;
        }
    },

    // Get user bookings
    getUserBookings: async (userId) => {
        return bookingAPI.getAll(userId);
    }
};
