"use client"

import React, { useState, useEffect } from 'react'
import admin from './components.module.css'

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/products`);
                const result = await response.json();
                
                if (result.success) {
                    setProducts(result.data);
                } else {
                    setError(result.error || "Failed to fetch products");
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading products...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div className={admin.container}>
            <h1>Available Rooms</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {products.map((product) => (
                    <div key={product._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                        <h3>{product.title}</h3>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Offer:</strong> {product.offer}% off</p>
                        <p><strong>Amenities:</strong> {product.amenities}</p>
                        <p>{product.description}</p>
                        <button style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}>
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;
