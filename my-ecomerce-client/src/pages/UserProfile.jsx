import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiCreditCard, FiPackage, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA 12345',
    avatar: 'https://via.placeholder.com/150',
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: FiUser },
    { id: 'security', label: 'Security', icon: FiLock },
    { id: 'payment', label: 'Payment Methods', icon: FiCreditCard },
    { id: 'orders', label: 'Order History', icon: FiPackage },
    { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const TabContent = ({ tabId }) => {
    switch (tabId) {
      case 'personal':
        return <PersonalInfo user={user} />;
      case 'security':
        return <SecuritySettings />;
      case 'payment':
        return <PaymentMethods />;
      case 'orders':
        return <OrderHistory />;
      case 'wishlist':
        return <Wishlist />;
      case 'settings':
        return <AccountSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-center mb-2">{user.name}</h2>
            <p className="text-gray-600 text-center">{user.email}</p>
          </div>
          <nav className="bg-white rounded-lg shadow-md p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center w-full px-4 py-2 mb-2 rounded-md transition-colors duration-200 ${
                  activeTab === tab.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <tab.icon className="mr-3" />
                {tab.label}
              </button>
            ))}
            <button className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-100 rounded-md transition-colors duration-200">
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </nav>
        </aside>
        <main className="w-full md:w-3/4">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <TabContent tabId={activeTab} />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

const PersonalInfo = ({ user }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">Full Name</label>
        <input type="text" defaultValue={user.name} className="w-full px-3 py-2 border rounded-md" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Email</label>
        <input type="email" defaultValue={user.email} className="w-full px-3 py-2 border rounded-md" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Phone</label>
        <input type="tel" defaultValue={user.phone} className="w-full px-3 py-2 border rounded-md" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Address</label>
        <input type="text" defaultValue={user.address} className="w-full px-3 py-2 border rounded-md" />
      </div>
    </div>
    <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
      Save Changes
    </button>
  </div>
);

const SecuritySettings = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Change Password</h3>
      <div className="space-y-4">
        <input type="password" placeholder="Current Password" className="w-full px-3 py-2 border rounded-md" />
        <input type="password" placeholder="New Password" className="w-full px-3 py-2 border rounded-md" />
        <input type="password" placeholder="Confirm New Password" className="w-full px-3 py-2 border rounded-md" />
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
        Update Password
      </button>
    </div>
    <div>
      <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
      <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200">
        Enable 2FA
      </button>
    </div>
  </div>
);

const PaymentMethods = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div className="flex items-center">
          <FiCreditCard className="text-2xl mr-4" />
          <div>
            <p className="font-medium">Visa ending in 1234</p>
            <p className="text-sm text-gray-600">Expires 12/2024</p>
          </div>
        </div>
        <button className="text-red-500 hover:text-red-600">Remove</button>
      </div>
      <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
        Add New Payment Method
      </button>
    </div>
  </div>
);

const OrderHistory = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Order History</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((order) => (
        <div key={order} className="p-4 border rounded-md">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">Order #{order}12345</p>
            <p className="text-sm text-gray-600">Placed on: 01/01/2023</p>
          </div>
          <p className="text-sm text-gray-600 mb-2">Status: Delivered</p>
          <p className="font-medium">Total: $99.99</p>
          <button className="mt-2 text-blue-500 hover:text-blue-600">View Details</button>
        </div>
      ))}
    </div>
  </div>
);

const Wishlist = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="border rounded-md p-4">
          <img src={`https://via.placeholder.com/150?text=Item${item}`} alt={`Item ${item}`} className="w-full h-40 object-cover mb-2" />
          <h3 className="font-medium">Product Name</h3>
          <p className="text-gray-600">$49.99</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
);

const AccountSettings = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Email Notifications</h3>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Receive order updates
        </label>
        <label className="flex items-center mt-2">
          <input type="checkbox" className="mr-2" />
          Receive promotional emails
        </label>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Privacy Settings</h3>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Make my profile public
        </label>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Language Preferences</h3>
        <select className="w-full px-3 py-2 border rounded-md">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>
    </div>
    <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
      Save Settings
    </button>
  </div>
);

export default UserProfile;