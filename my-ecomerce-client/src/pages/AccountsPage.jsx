// src/pages/AccountsPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AccountsPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Welcome</h2>
          <p className="text-sm text-gray-600 mt-1">
            {isRegister ? 'Create your account' : 'Log in to your account'}
          </p>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsRegister(false)}
            className={`px-3 py-1 text-sm rounded-lg ${!isRegister ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} focus:outline-none`}
          >
            Login
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`ml-2 px-3 py-1 text-sm rounded-lg ${isRegister ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} focus:outline-none`}
          >
            Register
          </button>
        </div>
        <motion.div
          key={isRegister ? 'register' : 'login'}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          {isRegister ? (
            <RegisterForm />
          ) : (
            <LoginForm />
          )}
        </motion.div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="space-y-3">
      <div>
        <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-1 text-sm border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter your email address"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm text-gray-600 mb-1">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-1 text-sm border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 text-sm rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
    </form>
  );
};

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <form className="space-y-2">
      <div>
        <label htmlFor="name" className="block text-sm text-gray-600 mb-1">Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-1 text-sm border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-1 text-sm border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter your email address"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm text-gray-600 mb-1">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-1 text-sm border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Create a password"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm text-gray-600 mb-1">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-1 text-sm border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Re-enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 text-sm rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
  );
};

export default AccountsPage;
// // src/pages/AccountsPage.jsx
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const AccountsPage = () => {
//   const [isRegister, setIsRegister] = useState(false);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Welcome</h2>
//           <p className="text-gray-600 mt-2">
//             {isRegister ? 'Create your account' : 'Log in to your account'}
//           </p>
//         </div>
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={() => setIsRegister(false)}
//             className={`px-4 py-2 rounded-lg ${!isRegister ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} focus:outline-none`}
//           >
//             Login
//           </button>
//           <button
//             onClick={() => setIsRegister(true)}
//             className={`ml-4 px-4 py-2 rounded-lg ${isRegister ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} focus:outline-none`}
//           >
//             Register
//           </button>
//         </div>
//         <motion.div
//           key={isRegister ? 'register' : 'login'}
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -50 }}
//           transition={{ duration: 0.5 }}
//         >
//           {isRegister ? (
//             <RegisterForm />
//           ) : (
//             <LoginForm />
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <form>
//       <div className="mb-4">
//         <label htmlFor="email" className="block text-gray-600 mb-2">Email Address</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
//           placeholder="Enter your email address"
//           required
//         />
//       </div>
//       <div className="mb-6">
//         <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
//           placeholder="Enter your password"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Login
//       </button>
//     </form>
//   );
// };

// const RegisterForm = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   return (
//     <form>
//       <div className="mb-4">
//         <label htmlFor="name" className="block text-gray-600 mb-2">Full Name</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
//           placeholder="Enter your full name"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="email" className="block text-gray-600 mb-2">Email Address</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
//           placeholder="Enter your email address"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
//           placeholder="Create a password"
//           required
//         />
//       </div>
//       <div className="mb-6">
//         <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">Confirm Password</label>
//         <input
//           type="password"
//           id="confirmPassword"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
//           placeholder="Re-enter your password"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Register
//       </button>
//     </form>
//   );
// };

// export default AccountsPage;
