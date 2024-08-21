// Footer.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 shadow-lg">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Information Section */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-extrabold">Company Name</h2>
          <p className="text-gray-300 text-base">Providing quality products and services with a commitment to excellence.</p>
          <p className="text-gray-300 text-base">1234 Street Name, City, State, 56789</p>
          <p className="text-gray-300 text-base">Email: contact@example.com</p>
          <p className="text-gray-300 text-base">Phone: (123) 456-7890</p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-base">
            <li><a href="#" className="hover:text-gray-400 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-gray-400 transition-colors">Products</a></li>
            <li><a href="#" className="hover:text-gray-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-gray-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* About Us Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">About Us</h3>
          <p className="text-gray-300 text-base">Learn more about our mission, values, and the team behind our success. Our goal is to deliver the best experience for our customers.</p>
        </div>

        {/* Social Links Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-gray-200 transition-colors"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="text-gray-300 hover:text-gray-200 transition-colors"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="text-gray-300 hover:text-gray-200 transition-colors"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#" className="text-gray-300 hover:text-gray-200 transition-colors"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-12 border-t border-gray-700 pt-4">
        <p className="text-gray-400 text-sm">© 2024 Company Name Inc. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
