import React, { useState } from 'react';

const CheckoutPage = () => {
  // Static data for demonstration purposes
  const cartItems = [
    { id: 1, name: 'Plant Pot', price: 12.99, quantity: 2 },
    { id: 2, name: 'Succulent Plant', price: 8.99, quantity: 1 },
    { id: 3, name: 'Garden Tools', price: 22.50, quantity: 1 },
  ];

  const shippingAddress = {
    street: '123 Green Lane',
    city: 'Plantville',
    state: 'CA',
    zip: '90210',
    country: 'USA',
  };

  const paymentMethod = 'Credit Card';

  const [discountCode, setDiscountCode] = useState('');
  const [isGift, setIsGift] = useState(false);

  const calculateTotal = () => {
    let subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    let discount = 0;
    if (discountCode === 'DISCOUNT10') {
      discount = subtotal * 0.10;
    }
    let total = (subtotal - discount).toFixed(2);
    return { subtotal, discount, total };
  };

  const { subtotal, discount, total } = calculateTotal();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Order Summary */}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between border-b py-2">
                <span className="font-medium text-gray-600">{item.name}</span>
                <span className="text-gray-500">${item.price.toFixed(2)} x {item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 font-bold text-gray-800">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between py-2 text-red-500 font-bold">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 font-bold text-gray-800">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Address</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600">{shippingAddress.street}</p>
            <p className="text-gray-600">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
            <p className="text-gray-600">{shippingAddress.country}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        {/* Payment Method */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Method</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-gray-600">{paymentMethod}</p>
        </div>
      </div>

      <div className="mb-8">
        {/* Additional Options */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Options</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Enter discount code"
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isGift}
              onChange={() => setIsGift(!isGift)}
              className="mr-2"
            />
            <label className="text-gray-600">This order is a gift</label>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default CheckoutPage;
