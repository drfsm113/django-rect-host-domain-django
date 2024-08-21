import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ image, title, price, rating }) => {
  return (
    <motion.div
      className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-medium text-gray-700">${price}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < rating ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
            <span className="ml-2 text-gray-600">({rating}/5)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;