// src/components/layout/Navbar.jsx

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCartOpen } from '../../src/features/cart/cartSlice';
import { useScrollDirection } from '../../src/hook/useScrollDirection';
import { useScrolled } from '../../src/hook/useScrolled'; // make sure this file exists

const CartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993
      l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0
      01-1.12-1.243l1.264-12A1.125 1.125 0
      015.513 7.5h12.974c.576 0 1.059.435
      1.119 1.007zM8.625 10.5a.375.375 0
      11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0
      11-7.5 0 3.75 3.75 0
      017.5 0zM4.501 20.118a7.5 7.5 0
      0114.998 0A17.933 17.933 0
      0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const MenuIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5
      5.25h16.5" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  // You can keep or remove the hide-on-scroll behavior:
  const scrollDirection = useScrollDirection(); // remove if you want always-visible
  const scrolled = useScrolled(10);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
  ];

  const handleCartClick = () => dispatch(setCartOpen(true));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300
        ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* Edge-to-edge transparent header; bottom border only when scrolled */}
      <div className={`${scrolled ? 'bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 shadow-sm' : 'bg-transparent'} transition-all duration-300`}>
        <nav className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Left links (desktop) */}
            <div className="hidden lg:flex lg:flex-1 lg:gap-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-base font-semibold leading-6 text-gray-900 transition-opacity hover:opacity-70 ${isActive ? 'underline' : ''}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Center Logo */}
            <div className="flex lg:flex-1 lg:justify-center">
              <Link to="/" className="-m-1.5 p-1.5">
                <h1 className="text-4xl text-gray-900 font-signerica">KYRO</h1>
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex flex-1 items-center justify-end gap-x-6">
              <Link to="/account/login" className="hidden lg:block text-gray-900 transition-opacity hover:opacity-70">
                <span className="sr-only">Account</span>
                <UserIcon className="h-6 w-6" />
              </Link>

              <button onClick={handleCartClick} className="relative -m-1.5 p-1.5 text-gray-900 transition-opacity hover:opacity-70">
                <span className="sr-only">Shopping Cart</span>
                <CartIcon className="h-6 w-6" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          <div className={`overflow-hidden lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
            <div className="space-y-2 px-1 pb-6 pt-2 border-t border-gray-200">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink
                to="/account/login"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                Account
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;