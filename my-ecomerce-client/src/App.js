
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Adjust the path if necessary
import Footer from './components/Footer'; // Adjust the path if necessary
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import AccountsPage from './pages/AccountsPage';
import AccountPage from './pages/AccountPage';
import UserProfile from './pages/UserProfile';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-[var(--background-color)] text-[var(--primary-color)]">
        {/* Include the Header component */}
        <Header />
        
        {/* Main content area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
        
        {/* Include the Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

