// ProductsList.js
import React from 'react';
import ProductCard from './ProductCard';

// Generate an array of 20 items for demonstration
const products = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  image: `https://via.placeholder.com/150?text=Product+${index + 1}`,
  title: `Product ${index + 1}`,
  price: (Math.random() * 100).toFixed(2),  // Random price between 0 and 100
  rating: Math.floor(Math.random() * 4.5) + 1  // Random rating between 1 and 5
}));

const ProductsList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;