// src/pages/HomePage.jsx
import React from 'react';
import ProductsList from '../components/ProductCard/ProductsList';

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      <ProductsList />
    </div>
  );
};

export default HomePage;
