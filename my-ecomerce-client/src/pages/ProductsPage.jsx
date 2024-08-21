import React, { useState } from 'react';
import { motion } from 'framer-motion';
import productsData from './products.json';


const ProductsPage = () => {
  const [products] = useState(productsData.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  const sortProducts = (method) => {
    setSortBy(method);
    let sorted = [...filteredProducts];
    switch (method) {
      case 'priceLowHigh':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no sorting needed
        break;
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <div className="flex flex-wrap items-center justify-between mb-8">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => filterProducts(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => sortProducts(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="featured">Featured</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    // Here you would typically also update the wishlist in your app's state or backend
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative pb-2/3">
        <img src={product.image} alt={product.name} className="absolute h-full w-full object-cover" />
        {product.discountPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            Sale
          </div>
        )}
        <button 
          onClick={toggleWishlist}
          className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          {isWishlisted ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          )}
        </button>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 mr-1">★</span>
          <span>{product.rating}</span>
          <span className="text-gray-400 text-sm ml-1">({product.reviews} reviews)</span>
        </div>
        <div className="mt-auto">
          {product.discountPrice ? (
            <div className="flex items-center">
              <span className="text-lg font-bold text-red-500 mr-2">${product.discountPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>
        <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductsPage;