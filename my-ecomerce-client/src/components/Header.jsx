import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', url: '/' },
    { 
      name: 'Accounts',
      subMenu: [
        { name: 'login', url: '/login' },
        { name: 'Register', url: '/register' },
        { name: 'Accounts', url: '/accounts' },
        { name: 'Account', url: '/account' },
        { name: 'checkout', url: '/checkout' },
      ]
    },
   
    { name: 'User Profile', url: '/userprofile' },
    { name: 'products', url: '/products' },
  ];

  const allSuggestions = ['Home', 'Shop', 'Wallets', 'Offers', 'About Us'];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSuggestions(allSuggestions.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      const selectedSuggestion = suggestions[selectedIndex];
      setSearchTerm(selectedSuggestion);
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const isActive = (url) => location.pathname === url;

  const SearchInput = ({ className }) => (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        placeholder="Search..."
      />
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      {searchTerm && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`px-4 py-2 text-gray-800 hover:bg-blue-50 cursor-pointer ${
                index === selectedIndex ? 'bg-blue-100' : ''
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => {
                setSearchTerm(suggestion);
                setSuggestions([]);
                setSelectedIndex(-1);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const DropdownMenu = ({ item }) => (
    <div className="relative group" ref={dropdownRef}>
      <button
        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
        className="flex items-center text-gray-800 hover:text-blue-600 transition-colors duration-300 space-x-1"
      >
        <span>{item.name}</span>
        <FiChevronDown className={`ml-1 transition-transform duration-300 ${openDropdown === item.name ? 'transform rotate-180' : ''}`} />
      </button>
      {openDropdown === item.name && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
        >
          {item.subMenu.map((subItem, index) => (
            <Link
              key={index}
              to={subItem.url}
              className={`block px-4 py-2 text-sm ${isActive(subItem.url) ? 'bg-blue-500 text-white' : 'text-gray-800'} hover:bg-blue-500 hover:text-white transition-colors duration-300`}
            >
              {subItem.name}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );

  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">YourLogo</Link>

        {!isMobile && (
          <>
            <nav className="hidden md:flex flex-grow justify-center space-x-8">
              {navLinks.map((link, index) => (
                link.subMenu ? (
                  <DropdownMenu key={index} item={link} />
                ) : (
                  <Link
                    key={index}
                    to={link.url}
                    className={`text-gray-800 hover:text-blue-600 transition-colors duration-300 ${isActive(link.url) ? 'font-semibold' : ''}`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </nav>
            <SearchInput className="hidden md:block flex-grow max-w-md mx-4" />
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/cart" className="relative text-gray-800 hover:text-blue-600 transition-colors duration-300">
                <FiShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">3</span>
              </Link>
              <Link to="/profile" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
                <FiUser className="h-6 w-6" />
              </Link>
            </div>
          </>
        )}

        {isMobile && (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <Link to="/cart" className="relative text-gray-800 hover:text-blue-600 transition-colors duration-300">
              <FiShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">3</span>
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5 }}
              className="fixed top-0 left-0 w-80 h-full bg-white text-gray-800 z-50 shadow-lg"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <Link to="/" className="text-2xl font-bold text-blue-600">YourLogo</Link>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex-grow flex flex-col space-y-4 p-6">
                  {navLinks.map((link, index) => (
                    link.subMenu ? (
                      <DropdownMenu key={index} item={link} />
                    ) : (
                      <Link
                        key={index}
                        to={link.url}
                        className={`text-gray-800 hover:text-blue-600 transition-colors duration-300 ${isActive(link.url) ? 'font-semibold' : ''}`}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )
                  ))}
                </nav>
                <div className="p-6 border-t border-gray-200">
                  <SearchInput />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
// ================================================================
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useLocation } from 'react-router-dom';

// const Header = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const dropdownRef = useRef(null);
//   const location = useLocation(); // Get current route

//   const navLinks = [
//     { name: 'Home', url: '/' },
//     { 
//       name: 'Shop',
//       subMenu: [
//         { name: 'Categories', url: '/categories' },
//         { name: 'New Arrivals', url: '/new-arrivals' },
//         { name: 'Best Sellers', url: '/best-sellers' },
//       ]
//     },
//     { name: 'account', url: '/account' },
//     { name: 'Offers', url: '/offers' },
//     { name: 'About Us', url: '/about' },
//   ];

//   const allSuggestions = ['Home', 'Shop', 'Wallets', 'Offers', 'About Us'];

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     setSuggestions(allSuggestions.filter(item =>
//       item.toLowerCase().includes(searchTerm.toLowerCase())
//     ));
//   }, [searchTerm]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'ArrowDown') {
//       setSelectedIndex((prevIndex) =>
//         Math.min(prevIndex + 1, suggestions.length - 1)
//       );
//     } else if (event.key === 'ArrowUp') {
//       setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
//     } else if (event.key === 'Enter' && selectedIndex >= 0) {
//       const selectedSuggestion = suggestions[selectedIndex];
//       setSearchTerm(selectedSuggestion);
//       setSuggestions([]);
//       setSelectedIndex(-1);
//     }
//   };

//   const isActive = (url) => location.pathname === url;

//   const SearchInput = ({ className }) => (
//     <div className={`relative ${className}`}>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         onKeyDown={handleKeyDown}
//         className="w-full py-2 px-4 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Search..."
//       />
//       {searchTerm && suggestions.length > 0 && (
//         <ul className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg max-h-60 overflow-y-auto z-20">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               className={`px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer ${
//                 index === selectedIndex ? 'bg-gray-700' : ''
//               }`}
//               onMouseEnter={() => setSelectedIndex(index)}
//               onClick={() => {
//                 setSearchTerm(suggestion);
//                 setSuggestions([]);
//                 setSelectedIndex(-1);
//               }}
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );

//   const DropdownMenu = ({ item }) => (
//     <div className="relative group" ref={dropdownRef}>
//       <button
//         onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
//         className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 space-x-1"
//       >
//         <span>{item.name}</span>
//         <span className={`ml-1 ${openDropdown === item.name ? 'transform rotate-180' : ''}`}>▼</span>
//       </button>
//       {openDropdown === item.name && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.2 }}
//           className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20"
//         >
//           {item.subMenu.map((subItem, index) => (
//             <a
//               key={index}
//               href={subItem.url}
//               className={`block px-4 py-2 text-sm ${isActive(subItem.url) ? 'bg-blue-500 text-white' : 'text-gray-300'} hover:bg-blue-500 hover:text-white transition-colors duration-300`}
//             >
//               {subItem.name}
//             </a>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );

//   return (
//     <header className="bg-gray-900 text-white shadow-md">
//       <div className="container mx-auto flex items-center justify-between py-4 px-6">
//         <a href="/" className="text-2xl font-bold text-blue-500">YourLogo</a>

//         {!isMobile && (
//           <>
//             <nav className="hidden md:flex flex-grow justify-center space-x-8">
//               {navLinks.map((link, index) => (
//                 link.subMenu ? (
//                   <DropdownMenu key={index} item={link} />
//                 ) : (
//                   <a
//                     key={index}
//                     href={link.url}
//                     className={`text-gray-300 hover:text-white transition-colors duration-300 ${isActive(link.url) ? 'bg-blue-500 text-white px-4 py-2 rounded-lg' : ''}`}
//                   >
//                     {link.name}
//                   </a>
//                 )
//               ))}
//             </nav>
//             <SearchInput className="hidden md:block flex-grow max-w-md mx-4" />
//             <div className="hidden md:flex items-center space-x-6">
//               <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300">
//                 Cart
//                 <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">3</span>
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
//                 Profile
//               </a>
//             </div>
//           </>
//         )}

//         {isMobile && (
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="text-gray-300 hover:text-white transition-colors duration-300"
//             >
//               Menu
//             </button>
//             <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300">
//               Cart
//               <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">3</span>
//             </a>
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {isSidebarOpen && isMobile && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black bg-opacity-50 z-40"
//               onClick={() => setIsSidebarOpen(false)}
//             />
//             <motion.div
//               initial={{ x: '-100%' }}
//               animate={{ x: '0%' }}
//               exit={{ x: '-100%' }}
//               transition={{ duration: 0.5 }}
//               className="fixed top-0 left-0 w-80 h-full bg-gray-800 text-white z-50 shadow-lg rounded-r-lg"
//             >
//               <div className="flex flex-col h-full">
//                 <button
//                   onClick={() => setIsSidebarOpen(false)}
//                   className="self-end p-4 text-gray-300 hover:text-white"
//                 >
//                   Close
//                 </button>
//                 <nav className="flex-grow flex flex-col space-y-4 p-6">
//                   {navLinks.map((link, index) => (
//                     link.subMenu ? (
//                       <DropdownMenu key={index} item={link} />
//                     ) : (
//                       <a
//                         key={index}
//                         href={link.url}
//                         className={`text-gray-300 hover:text-white transition-colors duration-300 ${isActive(link.url) ? 'bg-blue-500 text-white px-4 py-2 rounded-lg' : ''}`}
//                       >
//                         {link.name}
//                       </a>
//                     )
//                   ))}
//                 </nav>
//                 <div className="p-6">
//                   <SearchInput />
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// =================================
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaBars, FaTimes, FaShoppingCart, FaUser, FaHome, FaStore, FaWallet, FaTag, FaInfoCircle, FaChevronDown } from 'react-icons/fa';
// import { IoSearch } from 'react-icons/io5';

// const Header = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const dropdownRef = useRef(null);

//   const navLinks = [
//     { name: 'Home', url: '/', icon: <FaHome /> },
//     { 
//       name: 'Shop', 
//       icon: <FaStore />,
//       subMenu: [
//         { name: 'Categories', url: '/categories' },
//         { name: 'New Arrivals', url: '/new-arrivals' },
//         { name: 'Best Sellers', url: '/best-sellers' },
//       ]
//     },
//     { name: 'Wallets', url: '/wallets', icon: <FaWallet /> },
//     { name: 'Offers', url: '/offers', icon: <FaTag /> },
//     { name: 'About Us', url: '/about', icon: <FaInfoCircle /> },
//   ];

//   const allSuggestions = ['Home', 'Shop', 'Wallets', 'Offers', 'About Us'];

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     setSuggestions(allSuggestions.filter(item =>
//       item.toLowerCase().includes(searchTerm.toLowerCase())
//     ));
//   }, [searchTerm]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'ArrowDown') {
//       setSelectedIndex((prevIndex) =>
//         Math.min(prevIndex + 1, suggestions.length - 1)
//       );
//     } else if (event.key === 'ArrowUp') {
//       setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
//     } else if (event.key === 'Enter' && selectedIndex >= 0) {
//       const selectedSuggestion = suggestions[selectedIndex];
//       setSearchTerm(selectedSuggestion);
//       setSuggestions([]);
//       setSelectedIndex(-1);
//     }
//   };

//   const SearchInput = ({ className }) => (
//     <div className={`relative ${className}`}>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         onKeyDown={handleKeyDown}
//         className="w-full py-2 px-4 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Search..."
//       />
//       <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//       {searchTerm && suggestions.length > 0 && (
//         <ul className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg max-h-60 overflow-y-auto z-20">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               className={`px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer ${
//                 index === selectedIndex ? 'bg-gray-700' : ''
//               }`}
//               onMouseEnter={() => setSelectedIndex(index)}
//               onClick={() => {
//                 setSearchTerm(suggestion);
//                 setSuggestions([]);
//                 setSelectedIndex(-1);
//               }}
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );

//   const DropdownMenu = ({ item }) => (
//     <div className="relative group" ref={dropdownRef}>
//       <button
//         onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
//         className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 space-x-1"
//       >
//         <span>{item.name}</span>
//       </button>
//       {openDropdown === item.name && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.2 }}
//           className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20"
//         >
//           {item.subMenu.map((subItem, index) => (
//             <a
//               key={index}
//               href={subItem.url}
//               className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-500 hover:text-white transition-colors duration-300"
//             >
//               {subItem.name}
//             </a>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );

//   return (
//     <header className="bg-gray-900 text-white shadow-md">
//       <div className="container mx-auto flex items-center justify-between py-4 px-6">
//         <a href="/" className="text-2xl font-bold text-blue-500">YourLogo</a>

//         {!isMobile && (
//           <>
//             <nav className="hidden md:flex flex-grow justify-center space-x-8">
//               {navLinks.map((link, index) => (
//                 link.subMenu ? (
//                   <DropdownMenu key={index} item={link} />
//                 ) : (
//                   <a
//                     key={index}
//                     href={link.url}
//                     className="text-gray-300 hover:text-white transition-colors duration-300"
//                   >
//                     {link.name}
//                   </a>
//                 )
//               ))}
//             </nav>
//             <SearchInput className="hidden md:block flex-grow max-w-md mx-4" />
//             <div className="hidden md:flex items-center space-x-6">
//               <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300">
//                 <FaShoppingCart className="h-6 w-6" />
//                 <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">3</span>
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
//                 <FaUser className="h-6 w-6" />
//               </a>
//             </div>
//           </>
//         )}

//         {isMobile && (
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="text-gray-300 hover:text-white transition-colors duration-300"
//             >
//               <FaBars className="h-6 w-6" />
//             </button>
//             <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300">
//               <FaShoppingCart className="h-6 w-6" />
//               <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">3</span>
//             </a>
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {isSidebarOpen && isMobile && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black bg-opacity-50 z-40"
//               onClick={() => setIsSidebarOpen(false)}
//             />
//             <motion.div
//               initial={{ x: '-100%' }}
//               animate={{ x: '0%' }}
//               exit={{ x: '-100%' }}
//               transition={{ duration: 0.5 }}
//               className="fixed top-0 left-0 w-80 h-full bg-gray-800 text-white z-50 shadow-lg rounded-r-lg"
//             >
//               <div className="flex flex-col h-full">
//                 <button
//                   onClick={() => setIsSidebarOpen(false)}
//                   className="self-end p-4 text-gray-300 hover:text-white"
//                 >
//                   <FaTimes className="h-6 w-6" />
//                 </button>
//                 <nav className="flex-grow flex flex-col space-y-4 p-6">
//                   {navLinks.map((link, index) => (
//                     link.subMenu ? (
//                       <DropdownMenu key={index} item={link} />
//                     ) : (
//                       <a
//                         key={index}
//                         href={link.url}
//                         className="text-gray-300 hover:text-white transition-colors duration-300"
//                       >
//                         {link.icon} <span className="ml-2">{link.name}</span>
//                       </a>
//                     )
//                   ))}
//                 </nav>
//                 <div className="p-6">
//                   <SearchInput />
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// ========================================
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaBars, FaTimes, FaShoppingCart, FaUser, FaHome, FaStore, FaWallet, FaTag, FaInfoCircle } from 'react-icons/fa';
// import { IoSearch } from 'react-icons/io5';

// const Header = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const navLinks = [
//     { name: 'Home', url: '/', icon: <FaHome /> },
//     { name: 'Login', url: '/login', icon: <FaStore /> },
//     { name: 'accounts', url: '/accounts', icon: <FaStore /> },
//     { name: 'Shop', url: '/shop', icon: <FaStore /> },
//     { name: 'Wallets', url: '/wallets', icon: <FaWallet /> },
//     { name: 'Offers', url: '/offers', icon: <FaTag /> },
//     { name: 'About Us', url: '/about', icon: <FaInfoCircle /> },
//   ];

//   const allSuggestions = ['Home', 'Shop', 'Wallets', 'Offers', 'About Us'];

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     setSuggestions(allSuggestions.filter(item =>
//       item.toLowerCase().includes(searchTerm.toLowerCase())
//     ));
//   }, [searchTerm]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'ArrowDown') {
//       setSelectedIndex((prevIndex) =>
//         Math.min(prevIndex + 1, suggestions.length - 1)
//       );
//     } else if (event.key === 'ArrowUp') {
//       setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
//     } else if (event.key === 'Enter' && selectedIndex >= 0) {
//       const selectedSuggestion = suggestions[selectedIndex];
//       setSearchTerm(selectedSuggestion);
//       setSuggestions([]);
//       setSelectedIndex(-1);
//     }
//   };

//   const SearchInput = ({ className }) => (
//     <div className={`relative ${className}`}>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         onKeyDown={handleKeyDown}
//         className="w-full py-2 px-4 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
//         placeholder="Search..."
//       />
//       <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//       {searchTerm && suggestions.length > 0 && (
//         <ul className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg max-h-60 overflow-y-auto z-20">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               className={`px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer ${
//                 index === selectedIndex ? 'bg-gray-700' : ''
//               }`}
//               onMouseEnter={() => setSelectedIndex(index)}
//               onClick={() => {
//                 setSearchTerm(suggestion);
//                 setSuggestions([]);
//                 setSelectedIndex(-1);
//               }}
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );

//   return (
//     <header className="bg-gray-900 text-white shadow-md">
//       <div className="container mx-auto flex items-center justify-between py-4 px-6">
//         <a href="/" className="text-2xl font-bold">YourLogo</a>

//         {!isMobile && (
//           <>
//             <nav className="hidden md:flex flex-grow justify-center space-x-8">
//               {navLinks.map((link, index) => (
//                 <a
//                   key={index}
//                   href={link.url}
//                   className={`text-gray-300 hover:text-white transition-colors duration-300 ${index === 0 ? 'border-b-2 border-white font-semibold' : ''}`}
//                 >
//                   {link.name}
//                 </a>
//               ))}
//             </nav>
//             <SearchInput className="hidden md:block flex-grow max-w-md mx-4" />
//             <div className="hidden md:flex items-center space-x-6">
//               <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300">
//                 <FaShoppingCart className="h-6 w-6" />
//                 <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">3</span>
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
//                 <FaUser className="h-6 w-6" />
//               </a>
//             </div>
//           </>
//         )}

//         {isMobile && (
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="text-gray-300 hover:text-white transition-colors duration-300"
//             >
//               <FaBars className="h-6 w-6" />
//             </button>
//             <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300">
//               <FaShoppingCart className="h-6 w-6" />
//               <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">3</span>
//             </a>
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {isSidebarOpen && isMobile && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black bg-opacity-50 z-40"
//               onClick={() => setIsSidebarOpen(false)}
//             />
//             <motion.div
//               initial={{ x: '-100%' }}
//               animate={{ x: '0%' }}
//               exit={{ x: '-100%' }}
//               transition={{ duration: 0.5 }}
//               className="fixed top-0 left-0 w-80 h-full bg-gray-800 text-white z-50 shadow-lg rounded-r-lg"
//             >
//               <div className="flex flex-col h-full">
//                 <button
//                   onClick={() => setIsSidebarOpen(false)}
//                   className="self-end p-4 text-gray-300 hover:text-white"
//                 >
//                   <FaTimes className="h-6 w-6" />
//                 </button>

//                 <div className="flex items-center p-4 border-b border-gray-700">
//                   <FaUser className="h-12 w-12 text-gray-300" />
//                   <div className="ml-4">
//                     <span className="text-lg font-semibold">User Name</span>
//                     <p className="text-gray-400 text-sm">user@example.com</p>
//                   </div>
//                 </div>

//                 <nav className="flex flex-col p-4 space-y-4">
//                   {navLinks.map((link, index) => (
//                     <a
//                       key={index}
//                       href={link.url}
//                       className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 space-x-2"
//                     >
//                       {link.icon}
//                       <span>{link.name}</span>
//                     </a>
//                   ))}
//                 </nav>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// ================================================================
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';
// import { IoSearch } from 'react-icons/io5';

// const Header = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const navLinks = [
//     { name: 'Home', url: '/' },
//     { name: 'Shop', url: '/shop' },
//     { name: 'Wallets', url: '/wallets' },
//     { name: 'Offers', url: '/offers' },
//     { name: 'About Us', url: '/about' },
//   ];

//   const allSuggestions = ['Home', 'Shop', 'Wallets', 'Offers', 'About Us'];

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     setSuggestions(allSuggestions.filter(item =>
//       item.toLowerCase().includes(searchTerm.toLowerCase())
//     ));
//   }, [searchTerm]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'ArrowDown') {
//       setSelectedIndex((prevIndex) =>
//         Math.min(prevIndex + 1, suggestions.length - 1)
//       );
//     } else if (event.key === 'ArrowUp') {
//       setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
//     } else if (event.key === 'Enter' && selectedIndex >= 0) {
//       const selectedSuggestion = suggestions[selectedIndex];
//       setSearchTerm(selectedSuggestion);
//       setSuggestions([]);
//       setSelectedIndex(-1);
//     }
//   };

//   const SearchInput = ({ className }) => (
//     <div className={`relative ${className}`}>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         onKeyDown={handleKeyDown}
//         className="w-full py-2 px-4 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
//         placeholder="Search..."
//       />
//       <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//       {searchTerm && suggestions.length > 0 && (
//         <ul className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg max-h-60 overflow-y-auto z-20">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               className={`px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer ${
//                 index === selectedIndex ? 'bg-gray-700' : ''
//               }`}
//               onMouseEnter={() => setSelectedIndex(index)}
//               onClick={() => {
//                 setSearchTerm(suggestion);
//                 setSuggestions([]);
//                 setSelectedIndex(-1);
//               }}
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );

//   return (
//     <header className="bg-gray-900 text-white shadow-md">
//       <div className="container mx-auto flex items-center justify-between py-4 px-6">
//         <a href="/" className="text-2xl font-bold">YourLogo</a>

//         {!isMobile && (
//           <>
//             <nav className="hidden md:flex flex-grow justify-center space-x-8">
//               {navLinks.map((link, index) => (
//                 <a
//                   key={index}
//                   href={link.url}
//                   className={`text-gray-300 hover:text-white transition-colors duration-300 ${index === 0 ? 'border-b-2 border-white font-semibold' : ''}`}
//                 >
//                   {link.name}
//                 </a>
//               ))}
//             </nav>
//             <SearchInput className="hidden md:block flex-grow max-w-md mx-4" />
//             <div className="hidden md:flex items-center space-x-6">
//               <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300">
//                 <FaShoppingCart className="h-6 w-6" />
//                 <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">3</span>
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
//                 <FaUser className="h-6 w-6" />
//               </a>
//             </div>
//           </>
//         )}

//         {isMobile && (
//           <div className="flex items-center space-x-4">
//             <SearchInput className="flex-grow max-w-md" />
//             <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300">
//               <FaShoppingCart className="h-6 w-6" />
//               <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">3</span>
//             </a>
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="text-gray-300 hover:text-white transition-colors duration-300"
//             >
//               <FaBars className="h-6 w-6" />
//             </button>
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {isSidebarOpen && isMobile && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black bg-opacity-50 z-40"
//               onClick={() => setIsSidebarOpen(false)}
//             />
//             <motion.div
//               initial={{ x: '-100%' }}
//               animate={{ x: '0%' }}
//               exit={{ x: '-100%' }}
//               transition={{ duration: 0.5 }}
//               className="fixed top-0 left-0 w-80 h-full bg-gray-800 text-white z-50 shadow-lg rounded-r-lg"
//             >
//               <div className="flex flex-col h-full">
//                 <button
//                   onClick={() => setIsSidebarOpen(false)}
//                   className="self-end p-4 text-gray-300 hover:text-white"
//                 >
//                   <FaTimes className="h-6 w-6" />
//                 </button>

//                 <div className="flex items-center p-4 border-b border-gray-700">
//                   <FaUser className="h-12 w-12 text-gray-300" />
//                   <div className="ml-4">
//                     <span className="text-lg font-semibold">User Name</span>
//                     <p className="text-gray-400 text-sm">user@example.com</p>
//                   </div>
//                 </div>

//                 <nav className="flex flex-col p-4 space-y-4">
//                   {navLinks.map((link, index) => (
//                     <motion.a
//                       key={index}
//                       href={link.url}
//                       initial={{ opacity: 0, x: '-100%' }}
//                       animate={{ opacity: 1, x: '0%' }}
//                       exit={{ opacity: 0, x: '-100%' }}
//                       transition={{ duration: 0.5, delay: index * 0.1 }}
//                       className="text-gray-300 hover:text-white transition-colors duration-300"
//                     >
//                       {link.name}
//                     </motion.a>
//                   ))}
//                 </nav>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;

// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';
// // import { IoSearch } from 'react-icons/io5';

// // const Header = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust breakpoint as needed

// //   const navLinks = [
// //     { name: 'Home', url: '/', active: true },
// //     { name: 'Shop', url: '/shop', active: false },
// //     { name: 'Wallets', url: '/wallets', active: false },
// //     { name: 'Offers', url: '/offers', active: false },
// //     { name: 'About Us', url: '/about', active: false },
// //   ];

// //   // Dummy autocomplete suggestions
// //   const allSuggestions = ['Home', 'Shop', 'Wallets', 'Offers', 'About Us'];

// //   const handleSearch = (event) => {
// //     const value = event.target.value;
// //     setSearchTerm(value);
// //     setSuggestions(allSuggestions.filter(item => item.toLowerCase().includes(value.toLowerCase())));
// //   };

// //   // Handle screen size changes
// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
// //     };

// //     window.addEventListener('resize', handleResize);

// //     // Clean up listener on unmount
// //     return () => {
// //       window.removeEventListener('resize', handleResize);
// //     };
// //   }, []);

// //   return (
// //     <header className="bg-gray-900 text-white shadow-md">
// //       <div className="container mx-auto flex items-center justify-between py-4 px-6">
// //         {/* Logo */}
// //         <div className="text-2xl font-bold">
// //           <a href="/" className="flex items-center space-x-2">
// //             <span>YourLogo</span>
// //           </a>
// //         </div>

// //         {/* Desktop Navigation Links */}
// //         {!isMobile && (
// //           <nav className="hidden md:flex flex-grow justify-center space-x-8">
// //             {navLinks.map((link, index) => (
// //               <a
// //                 key={index}
// //                 href={link.url}
// //                 className={`text-gray-300 hover:text-white transition-colors duration-300 ${
// //                   link.active ? 'border-b-2 border-white font-semibold' : ''
// //                 }`}
// //               >
// //                 {link.name}
// //               </a>
// //             ))}
// //           </nav>
// //         )}

// //         {/* Desktop Search Input */}
// //         {!isMobile && (
// //           <div className="relative hidden md:block flex-grow max-w-md mx-4">
// //             <input
// //               type="text"
// //               value={searchTerm}
// //               onChange={handleSearch}
// //               className="w-full py-2 px-4 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
// //               placeholder="Search..."
// //             />
// //             <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //             {searchTerm && suggestions.length > 0 && (
// //               <ul className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg max-h-60 overflow-y-auto">
// //                 {suggestions.map((suggestion, index) => (
// //                   <li key={index} className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer">
// //                     {suggestion}
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </div>
// //         )}

// //         {/* Desktop Cart and Profile Icons */}
// //         {!isMobile && (
// //           <div className="hidden md:flex items-center space-x-6">
// //             <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
// //               <FaShoppingCart className="h-6 w-6" />
// //               <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
// //             </a>
// //             <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
// //               <FaUser className="h-6 w-6" />
// //             </a>
// //           </div>
// //         )}

// //         {/* Mobile Menu Button */}
// //         {isMobile && (
// //           <div className="md:hidden flex items-center space-x-4">
// //             <button
// //               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //               className="text-gray-300 hover:text-white transition-colors duration-300"
// //             >
// //               {isSidebarOpen ? (
// //                 <FaTimes className="h-6 w-6" />
// //               ) : (
// //                 <FaBars className="h-6 w-6" />
// //               )}
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Mobile Sidebar Menu */}
// //       <AnimatePresence>
// //         {isSidebarOpen && isMobile && (
// //           <>
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               transition={{ duration: 0.3 }}
// //               className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
// //               onClick={() => setIsSidebarOpen(false)}
// //             />
// //             <motion.div
// //               initial={{ x: '-100%' }}
// //               animate={{ x: '0%' }}
// //               exit={{ x: '-100%' }}
// //               transition={{ duration: 0.5 }}
// //               className="fixed top-0 left-0 w-80 h-full bg-gray-800 text-white z-50 shadow-lg rounded-r-lg"
// //             >
// //               <div className="flex flex-col h-full">
// //                 {/* Close Button */}
// //                 <div className="flex justify-end p-4">
// //                   <button
// //                     onClick={() => setIsSidebarOpen(false)}
// //                     className="text-gray-300 hover:text-white"
// //                   >
// //                     <FaTimes className="h-6 w-6" />
// //                   </button>
// //                 </div>

// //                 {/* User Profile Section */}
// //                 <div className="flex items-center p-4 border-b border-gray-700">
// //                   <FaUser className="h-12 w-12 text-gray-300" />
// //                   <div className="ml-4">
// //                     <span className="text-lg font-semibold">User Name</span>
// //                     <p className="text-gray-400 text-sm">user@example.com</p>
// //                   </div>
// //                 </div>

// //                 {/* Search Input */}
// //                 <div className="relative p-4 border-b border-gray-700">
// //                   <input
// //                     type="text"
// //                     value={searchTerm}
// //                     onChange={handleSearch}
// //                     className="w-full py-2 px-4 rounded-full border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
// //                     placeholder="Search..."
// //                   />
// //                   <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                   {searchTerm && suggestions.length > 0 && (
// //                     <ul className="absolute top-full left-0 mt-2 w-full bg-gray-700 border border-gray-600 rounded-lg max-h-60 overflow-y-auto">
// //                       {suggestions.map((suggestion, index) => (
// //                         <li key={index} className="px-4 py-2 text-gray-300 hover:bg-gray-600 cursor-pointer">
// //                           {suggestion}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   )}
// //                 </div>

// //                 {/* Navigation Links */}
// //                 <nav className="flex flex-col p-4 space-y-4">
// //                   {navLinks.map((link, index) => (
// //                     <motion.a
// //                       key={index}
// //                       href={link.url}
// //                       initial={{ opacity: 0, x: '-100%' }}
// //                       animate={{ opacity: 1, x: '0%' }}
// //                       exit={{ opacity: 0, x: '-100%' }}
// //                       transition={{ duration: 0.5, delay: index * 0.1 }}
// //                       className={`text-gray-300 hover:text-white transition-colors duration-300 ${
// //                         link.active ? 'font-semibold' : ''
// //                       }`}
// //                     >
// //                       {link.name}
// //                     </motion.a>
// //                   ))}
// //                 </nav>

// //                 {/* Cart Icon */}
// //                 <div className="flex items-center p-4 mt-auto border-t border-gray-700">
// //                   <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2">
// //                     <FaShoppingCart className="h-8 w-8" />
// //                     <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
// //                   </a>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>
// //     </header>
// //   );
// // };

// // export default Header;

// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';
// // import { IoSearch } from 'react-icons/io5';

// // const Header = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust breakpoint as needed

// //   const navLinks = [
// //     { name: 'Home', url: '/', active: true },
// //     { name: 'Shop', url: '/shop', active: false },
// //     { name: 'Wallets', url: '/wallets', active: false },
// //     { name: 'Offers', url: '/offers', active: false },
// //     { name: 'About Us', url: '/about', active: false },
// //   ];

// //   // Dummy autocomplete suggestions
// //   const allSuggestions = ['Home', 'Shop', 'Wallets', 'Offers', 'About Us'];

// //   const handleSearch = (event) => {
// //     const value = event.target.value;
// //     setSearchTerm(value);
// //     setSuggestions(allSuggestions.filter(item => item.toLowerCase().includes(value.toLowerCase())));
// //   };

// //   // Handle screen size changes
// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
// //     };

// //     window.addEventListener('resize', handleResize);

// //     // Clean up listener on unmount
// //     return () => {
// //       window.removeEventListener('resize', handleResize);
// //     };
// //   }, []);

// //   return (
// //     <header className="bg-gray-900 text-white shadow-md">
// //       <div className="container mx-auto flex items-center justify-between py-4 px-6">
// //         {/* Logo */}
// //         <div className="text-2xl font-bold">
// //           <a href="/" className="flex items-center space-x-2">
// //             <span>YourLogo</span>
// //           </a>
// //         </div>

// //         {/* Desktop Navigation Links */}
// //         {!isMobile && (
// //           <nav className="hidden md:flex flex-grow justify-center space-x-8">
// //             {navLinks.map((link, index) => (
// //               <a
// //                 key={index}
// //                 href={link.url}
// //                 className={`text-gray-300 hover:text-white transition-colors duration-300 ${
// //                   link.active ? 'border-b-2 border-white font-semibold' : ''
// //                 }`}
// //               >
// //                 {link.name}
// //               </a>
// //             ))}
// //           </nav>
// //         )}

// //         {/* Desktop Search Input */}
// //         {!isMobile && (
// //           <div className="relative hidden md:block flex-grow max-w-md mx-4">
// //             <input
// //               type="text"
// //               value={searchTerm}
// //               onChange={handleSearch}
// //               className="w-full py-2 px-4 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
// //               placeholder="Search..."
// //             />
// //             <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //             {searchTerm && suggestions.length > 0 && (
// //               <ul className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg max-h-60 overflow-y-auto">
// //                 {suggestions.map((suggestion, index) => (
// //                   <li key={index} className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer">
// //                     {suggestion}
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </div>
// //         )}

// //         {/* Desktop Cart and Profile Icons */}
// //         {!isMobile && (
// //           <div className="hidden md:flex items-center space-x-6">
// //             <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
// //               <FaShoppingCart className="h-6 w-6" />
// //               <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
// //             </a>
// //             <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
// //               <FaUser className="h-6 w-6" />
// //             </a>
// //           </div>
// //         )}

// //         {/* Mobile Menu Button */}
// //         {isMobile && (
// //           <div className="md:hidden flex items-center space-x-4">
// //             <button
// //               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //               className="text-gray-300 hover:text-white transition-colors duration-300"
// //             >
// //               {isSidebarOpen ? (
// //                 <FaTimes className="h-6 w-6" />
// //               ) : (
// //                 <FaBars className="h-6 w-6" />
// //               )}
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Mobile Sidebar Menu */}
// //       <AnimatePresence>
// //         {isSidebarOpen && isMobile && (
// //           <>
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               transition={{ duration: 0.3 }}
// //               className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-40"
// //               onClick={() => setIsSidebarOpen(false)}
// //             />
// //             <motion.div
// //               initial={{ x: '-100%' }}
// //               animate={{ x: '0%' }}
// //               exit={{ x: '-100%' }}
// //               transition={{ duration: 0.5 }}
// //               className="fixed top-0 left-0 w-80 h-full bg-gray-900 text-white z-50 shadow-lg rounded-r-lg"
// //             >
// //               <div className="flex flex-col h-full p-6 space-y-6">
// //                 {/* User Profile Section */}
// //                 <div className="flex items-center space-x-4 mb-4">
// //                   <FaUser className="h-10 w-10 text-gray-300" />
// //                   <span className="text-lg font-semibold">Profile</span>
// //                 </div>

// //                 {/* Search Input */}
// //                 <div className="relative mb-4">
// //                   <input
// //                     type="text"
// //                     value={searchTerm}
// //                     onChange={handleSearch}
// //                     className="w-full py-2 px-4 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
// //                     placeholder="Search..."
// //                   />
// //                   <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                   {searchTerm && suggestions.length > 0 && (
// //                     <ul className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg max-h-60 overflow-y-auto">
// //                       {suggestions.map((suggestion, index) => (
// //                         <li key={index} className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer">
// //                           {suggestion}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   )}
// //                 </div>

// //                 {/* Navigation Links */}
// //                 <nav className="flex flex-col space-y-4">
// //                   {navLinks.map((link, index) => (
// //                     <motion.a
// //                       key={index}
// //                       href={link.url}
// //                       initial={{ opacity: 0, x: '-100%' }}
// //                       animate={{ opacity: 1, x: '0%' }}
// //                       exit={{ opacity: 0, x: '-100%' }}
// //                       transition={{ duration: 0.5, delay: index * 0.1 }}
// //                       className={`text-gray-300 hover:text-white transition-colors duration-300 ${
// //                         link.active ? 'font-semibold' : ''
// //                       }`}
// //                     >
// //                       {link.name}
// //                     </motion.a>
// //                   ))}
// //                 </nav>

// //                 {/* Cart Icon */}
// //                 <div className="flex items-center space-x-4 mt-auto">
// //                   <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2">
// //                     <FaShoppingCart className="h-8 w-8" />
// //                     <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
// //                   </a>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>
// //     </header>
// //   );
// // };

// // export default Header;

// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';
// // import { IoSearch } from 'react-icons/io5';

// // const Header = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust breakpoint as needed

// //   const navLinks = [
// //     { name: 'Home', url: '/', active: true },
// //     { name: 'Shop', url: '/shop', active: false },
// //     { name: 'Wallets', url: '/wallets', active: false },
// //     { name: 'Offers', url: '/offers', active: false },
// //     { name: 'About Us', url: '/about', active: false },
// //   ];

// //   // Dummy autocomplete suggestions
// //   const allSuggestions = ['Home', 'Shop', 'Wallets', 'Offers', 'About Us'];

// //   const handleSearch = (event) => {
// //     const value = event.target.value;
// //     setSearchTerm(value);
// //     setSuggestions(allSuggestions.filter(item => item.toLowerCase().includes(value.toLowerCase())));
// //   };

// //   // Handle screen size changes
// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
// //     };

// //     window.addEventListener('resize', handleResize);

// //     // Clean up listener on unmount
// //     return () => {
// //       window.removeEventListener('resize', handleResize);
// //     };
// //   }, []);

// //   return (
// //     <header className="bg-gray-900 text-white shadow-md">
// //       <div className="container mx-auto flex items-center justify-between py-4 px-6">
// //         {/* Logo */}
// //         <div className="text-2xl font-bold">
// //           <a href="/" className="flex items-center space-x-2">
// //             <span>YourLogo</span>
// //           </a>
// //         </div>

// //         {/* Desktop Navigation Links */}
// //         {!isMobile && (
// //           <nav className="hidden md:flex flex-grow justify-center space-x-8">
// //             {navLinks.map((link, index) => (
// //               <a
// //                 key={index}
// //                 href={link.url}
// //                 className={`text-gray-300 hover:text-white transition-colors duration-300 ${
// //                   link.active ? 'border-b-2 border-white font-semibold' : ''
// //                 }`}
// //               >
// //                 {link.name}
// //               </a>
// //             ))}
// //           </nav>
// //         )}

// //         {/* Desktop Search Input */}
// //         {!isMobile && (
// //           <div className="relative hidden md:block flex-grow max-w-md mx-4">
// //             <input
// //               type="text"
// //               value={searchTerm}
// //               onChange={handleSearch}
// //               className="w-full py-2 px-4 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
// //               placeholder="Search..."
// //             />
// //             <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //             {searchTerm && suggestions.length > 0 && (
// //               <ul className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg max-h-60 overflow-y-auto">
// //                 {suggestions.map((suggestion, index) => (
// //                   <li key={index} className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer">
// //                     {suggestion}
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </div>
// //         )}

// //         {/* Desktop Cart and Profile Icons */}
// //         {!isMobile && (
// //           <div className="hidden md:flex items-center space-x-6">
// //             <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
// //               <FaShoppingCart className="h-6 w-6" />
// //               <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
// //             </a>
// //             <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
// //               <FaUser className="h-6 w-6" />
// //             </a>
// //           </div>
// //         )}

// //         {/* Mobile Menu Button */}
// //         {isMobile && (
// //           <div className="md:hidden flex items-center space-x-4">
// //             <button
// //               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //               className="text-gray-300 hover:text-white transition-colors duration-300"
// //             >
// //               {isSidebarOpen ? (
// //                 <FaTimes className="h-6 w-6" />
// //               ) : (
// //                 <FaBars className="h-6 w-6" />
// //               )}
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Mobile Sidebar Menu */}
// //       <AnimatePresence>
// //         {isSidebarOpen && isMobile && (
// //           <motion.div
// //             initial={{ opacity: 0, x: '-100%' }}
// //             animate={{ opacity: 1, x: '0%' }}
// //             exit={{ opacity: 0, x: '-100%' }}
// //             transition={{ duration: 0.5 }}
// //             className="fixed top-0 left-0 w-80 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white z-50 shadow-lg rounded-tr-lg rounded-br-lg"
// //           >
// //             <div className="flex flex-col items-center py-6 space-y-4">
// //               <div className="relative w-full px-4 mb-4">
// //                 <input
// //                   type="text"
// //                   value={searchTerm}
// //                   onChange={handleSearch}
// //                   className="w-full py-2 px-4 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
// //                   placeholder="Search..."
// //                 />
// //                 <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                 {searchTerm && suggestions.length > 0 && (
// //                   <ul className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg max-h-60 overflow-y-auto">
// //                     {suggestions.map((suggestion, index) => (
// //                       <li key={index} className="px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer">
// //                         {suggestion}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 )}
// //               </div>
// //               <a href="#" className="relative text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2">
// //                 <FaShoppingCart className="h-6 w-6" />
// //                 <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
// //               </a>
// //               <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2">
// //                 <FaUser className="h-6 w-6" />
// //                 <span>Profile</span> {/* Optional label */}
// //               </a>
// //               {navLinks.map((link, index) => (
// //                 <motion.a
// //                   key={index}
// //                   href={link.url}
// //                   initial={{ opacity: 0, x: '-100%' }}
// //                   animate={{ opacity: 1, x: '0%' }}
// //                   exit={{ opacity: 0, x: '-100%' }}
// //                   transition={{ duration: 0.5, delay: index * 0.1 }}
// //                   className={`text-gray-300 hover:text-white transition-colors duration-300 ${
// //                     link.active ? 'font-semibold' : ''
// //                   }`}
// //                 >
// //                   {link.name}
// //                 </motion.a>
// //               ))}
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </header>
// //   );
// // };

// // export default Header;


// // import React, { useState } from 'react';

// // const Header = () => {
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// //   const navLinks = [
// //     { name: 'Home', url: '/', active: true },
// //     { name: 'Shop', url: '/shop', active: false },
// //     { name: 'Wallets', url: '/wallets', active: false },
// //     { name: 'Offers', url: '/offers', active: false },
// //     { name: 'About Us', url: '/about', active: false },
// //   ];

// //   return (
// //     <header className="bg-gray-900 text-white shadow-lg">
// //       <div className="container mx-auto flex items-center justify-between py-4 px-6">
// //         {/* Logo */}
// //         <div className="text-2xl font-bold">
// //           <a href="/" className="flex items-center space-x-2">
// //             <span>YourLogo</span>
// //           </a>
// //         </div>

// //         {/* Navigation Links */}
// //         <nav className="hidden md:flex flex-grow justify-center space-x-8">
// //           {navLinks.map((link, index) => (
// //             <a
// //               key={index}
// //               href={link.url}
// //               className={`text-gray-300 hover:text-white transition-colors duration-300 ${
// //                 link.active ? 'border-b-2 border-white font-semibold' : ''
// //               }`}
// //             >
// //               {link.name}
// //             </a>
// //           ))}
// //         </nav>

// //         {/* Cart and Profile */}
// //         <div className="flex items-center space-x-4">
// //           <a href="#" className="relative">
// //             <svg className="h-6 w-6 text-gray-300 hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l1-7H6.4M9 21h6m2-4a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z"></path>
// //             </svg>
// //             <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
// //           </a>
// //           <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Profile</a>
// //         </div>

// //         {/* Mobile Menu Button */}
// //         <div className="md:hidden flex items-center">
// //           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white transition-colors duration-300">
// //             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
// //             </svg>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-800`}>
// //         <nav className="px-4 py-2 space-y-2">
// //           {navLinks.map((link, index) => (
// //             <a
// //               key={index}
// //               href={link.url}
// //               className={`block text-gray-300 hover:text-white transition-colors duration-300 ${
// //                 link.active ? 'font-semibold' : ''
// //               }`}
// //             >
// //               {link.name}
// //             </a>
// //           ))}
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// // import React, { useState } from 'react';

// // const Header = () => {
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// //   const navLinks = [
// //     { name: 'Home', url: '/', active: true },
// //     { name: 'Shop', url: '/shop', active: false },
// //     { name: 'Wallets', url: '/wallets', active: false },
// //     { name: 'Offers', url: '/offers', active: false },
// //     { name: 'About Us', url: '/about', active: false },
// //   ];

// //   return (
// //     <header className="bg-gray-900 text-white shadow-lg">
// //       <div className="container mx-auto flex justify-between items-center py-4 px-6">
// //         {/* Logo */}
// //         <div className="text-2xl font-semibold">
// //           <a href="#" className="hover:text-gray-400 transition duration-300">YourLogo</a>
// //         </div>

// //         {/* Navigation Links */}
// //         <nav className="hidden md:flex space-x-8">
// //           {navLinks.map((link, index) => (
// //             <a
// //               key={index}
// //               href={link.url}
// //               className={`text-lg ${link.active ? 'font-bold border-b-2 border-white' : 'text-gray-300 hover:text-gray-400'} transition duration-300`}
// //             >
// //               {link.name}
// //             </a>
// //           ))}
// //         </nav>

// //         {/* Cart and Profile */}
// //         <div className="flex items-center space-x-6">
// //           <a href="#" className="relative hover:text-gray-400 transition duration-300">
// //             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l1-7H6.4M9 21h6m2-4a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z"></path>
// //             </svg>
// //             <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
// //           </a>
// //           <a href="#" className="text-lg hover:text-gray-400 transition duration-300">Profile</a>
// //         </div>

// //         {/* Mobile Menu Button */}
// //         <div className="md:hidden flex items-center">
// //           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-gray-400 transition duration-300">
// //             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
// //             </svg>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-800 text-white`}>
// //         <nav className="px-4 py-2 space-y-2">
// //           {navLinks.map((link, index) => (
// //             <a
// //               key={index}
// //               href={link.url}
// //               className={`block text-lg ${link.active ? 'font-bold border-b-2 border-white' : 'text-gray-300 hover:text-gray-400'} transition duration-300`}
// //             >
// //               {link.name}
// //             </a>
// //           ))}
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// // import React, { useState } from 'react';

// // const Header = () => {
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// //   const navLinks = [
// //     { name: 'Home', url: '/', active: true },
// //     { name: 'Shop', url: '/shop', active: false },
// //     { name: 'Wallets', url: '/wallets', active: false },
// //     { name: 'Offers', url: '/offers', active: false },
// //     { name: 'About Us', url: '/about', active: false },
// //   ];

// //   return (
// //     <header className="bg-white shadow-md">
// //       <div className="container mx-auto flex justify-between items-center py-4 px-6">
// //         {/* Logo */}
// //         <div className="text-xl font-bold">
// //           <a href="#" className="text-gray-800">YourLogo</a>
// //         </div>

// //         {/* Navigation Links */}
// //         <nav className="hidden md:flex space-x-8">
// //           {navLinks.map((link, index) => (
// //             <a 
// //               key={index} 
// //               href={link.url} 
// //               className={`text-gray-600 hover:text-gray-800 ${link.active ? 'font-bold text-gray-800' : ''}`}
// //             >
// //               {link.name}
// //             </a>
// //           ))}
// //         </nav>

// //         {/* Cart and Profile */}
// //         <div className="flex items-center space-x-4">
// //           <a href="#" className="relative text-gray-600 hover:text-gray-800">
// //             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l1-7H6.4M9 21h6m2-4a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z"></path>
// //             </svg>
// //             <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
// //           </a>
// //           <a href="#" className="text-gray-600 hover:text-gray-800">Profile</a>
// //         </div>

// //         {/* Mobile Menu Button */}
// //         <div className="md:hidden flex items-center">
// //           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 focus:outline-none focus:text-gray-800">
// //             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
// //             </svg>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
// //         <nav className="px-4 py-2 space-y-2">
// //           {navLinks.map((link, index) => (
// //             <a 
// //               key={index} 
// //               href={link.url} 
// //               className={`block text-gray-600 hover:text-gray-800 ${link.active ? 'font-bold text-gray-800' : ''}`}
// //             >
// //               {link.name}
// //             </a>
// //           ))}
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;
