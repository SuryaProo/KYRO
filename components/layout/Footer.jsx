// src/components/layout/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../../src/constant/Brand';

const Footer = () => {
  // Use the custom Signerica font utility class we defined in tailwind.config.js
   const logoFontClass = BRAND.logoFontClass;

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          
          {/* 1. HUGE BRAND NAME */}
          <div className="flex-shrink-0">
            <h2 className={`${logoFontClass} text-8xl md:text-9xl lg:text-[150px] leading-none -mt-4`}>
              {BRAND.name}
            </h2>
          </div>

          {/* 2. NAVIGATION LINKS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            <div className="text-sm">
              <p className="font-bold uppercase tracking-wider">Shop</p>
              <nav className="mt-4 flex flex-col space-y-2">
                <Link to="/shop" className="transition hover:opacity-75">All</Link>
                <Link to="/products/prod_1" className="transition hover:opacity-75">Glazing Fluid</Link>
                <Link to="/products/prod_2" className="transition hover:opacity-75">Restore Cream</Link>
                <Link to="/products/prod_3" className="transition hover:opacity-75">Lip Treatment</Link>
              </nav>
            </div>

            <div className="text-sm">
              <p className="font-bold uppercase tracking-wider">About</p>
              <nav className="mt-4 flex flex-col space-y-2">
                <Link to="/about" className="transition hover:opacity-75">Our Story</Link>
                {/* You can add more links like 'Ingredients', 'FAQ', etc. */}
                <Link to="/faq" className="transition hover:opacity-75">FAQ</Link>
                <Link to="/contact" className="transition hover:opacity-75">Contact</Link>
              </nav>
            </div>

            <div className="text-sm">
              <p className="font-bold uppercase tracking-wider">Connect</p>
              <nav className="mt-4 flex flex-col space-y-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-75">Instagram</a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-75">TikTok</a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-75">YouTube</a>
              </nav>
            </div>
            
            <div className="text-sm">
              <p className="font-bold uppercase tracking-wider">Account</p>
              <nav className="mt-4 flex flex-col space-y-2">
                <Link to="/account/login" className="transition hover:opacity-75">Sign In</Link>
                <Link to="/account" className="transition hover:opacity-75">My Account</Link>
                <Link to="/account/orders" className="transition hover:opacity-75">Order History</Link>
              </nav>
            </div>
          </div>
        </div>
        
        {/* 3. BOTTOM LEGAL BAR */}
        <div className="mt-16 border-t border-gray-100 pt-8">
          <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
             <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
            <div className="flex space-x-6 text-xs text-gray-500">
               <Link to="/legal/terms-of-service" className="transition hover:opacity-75">Terms of Service</Link>
               <Link to="/legal/privacy-policy" className="transition hover:opacity-75">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;