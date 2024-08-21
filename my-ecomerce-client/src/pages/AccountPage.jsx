// src/pages/AccountsPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AccountsPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/path-to-your-background-image.jpg" 
          alt="Background" 
          className="object-cover w-full h-full opacity-30"
        />
      </div>
      
      {/* Glass morphism container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-2xl"
      >
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-3xl font-bold text-white"
          >
            Welcome
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-white mt-2"
          >
            {isRegister ? 'Create your account' : 'Log in to your account'}
          </motion.p>
        </div>
        
        <div className="flex justify-center mb-8">
          <ToggleButton isActive={!isRegister} onClick={() => setIsRegister(false)}>
            Login
          </ToggleButton>
          <ToggleButton isActive={isRegister} onClick={() => setIsRegister(true)}>
            Register
          </ToggleButton>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={isRegister ? 'register' : 'login'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isRegister ? <RegisterForm /> : <LoginForm />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const ToggleButton = ({ isActive, onClick, children }) => (
  <motion.button
    onClick={onClick}
    className={`px-6 py-2 rounded-full text-white font-semibold focus:outline-none ${
      isActive ? 'bg-white bg-opacity-30' : 'bg-transparent'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

const InputField = ({ label, type, value, onChange, placeholder }) => (
  <motion.div 
    className="mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <label className="block text-white text-sm font-bold mb-2" htmlFor={label}>
      {label}
    </label>
    <input
      className="w-full px-3 py-2 text-white placeholder-white placeholder-opacity-70 bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
      id={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  </motion.div>
);

const SubmitButton = ({ children }) => (
  <motion.button
    type="submit"
    className="w-full bg-white bg-opacity-30 text-white py-2 rounded-lg font-bold hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-white"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    {children}
  </motion.button>
);

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <InputField 
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <InputField 
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <SubmitButton>Login</SubmitButton>
    </form>
  );
};

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <form>
      <InputField 
        label="Full Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your full name"
      />
      <InputField 
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <InputField 
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create a password"
      />
      <InputField 
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
      />
      <SubmitButton>Register</SubmitButton>
    </form>
  );
};

export default AccountsPage;