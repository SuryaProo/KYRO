// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCartOpen } from '../../src/features/cart/cartSlice';
import { useScrolled } from '../../src/hook/useScrolled';
import { useNavTheme } from '../../src/hook/useNavTheme';

// Icons
const CartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);
const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const MenuIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const CloseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const scrolled = useScrolled(10);
  const theme = useNavTheme('light');
  const isDarkTop = !scrolled && theme === 'dark';

  const textClass = isDarkTop ? 'text-white' : 'text-gray-900';
  const iconClass = `${textClass} transition-opacity hover:opacity-70`;
  const badgeClass = isDarkTop ? 'bg-white text-black' : 'bg-gray-900 text-white';

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
  ];

  const handleCartClick = () => {
    dispatch(setCartOpen(true));
  };

  // Lock body scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Header above mobile overlay (z-150) but below cart drawer */}
      <header data-nav-header className="fixed inset-x-0 top-0 z-[150]">
        <div className={`${scrolled ? 'bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 shadow-sm' : 'bg-transparent'} transition-all duration-300`}>
          <nav className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex items-center justify-between py-4">
              {/* Desktop links */}
              <div className="hidden lg:flex lg:flex-1 lg:gap-x-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `${iconClass} text-base font-semibold leading-6 ${isActive ? 'underline' : ''}`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              {/* Center Logo */}
              <div className="flex lg:flex-1 lg:justify-center">
                <Link to="/" className="-m-1.5 p-1.5">
                  <h1 className={`text-4xl font-signerica ${textClass}`}>KYRO</h1>
                </Link>
              </div>

              {/* Right icons */}
              <div className="flex flex-1 items-center justify-end gap-x-6">
                {/* Account */}
                <Link
                  to="/account/login"
                  onClick={() => console.log('Account click')}
                  className={`hidden lg:block ${iconClass}`}
                >
                  <span className="sr-only">Account</span>
                  <UserIcon className="h-6 w-6" />
                </Link>

                {/* Cart */}
                <button
                  onClick={() => {
                    console.log('Cart click');
                    handleCartClick();
                  }}
                  className={`relative -m-1.5 p-1.5 ${iconClass}`}
                >
                  <span className="sr-only">Shopping Cart</span>
                  <CartIcon className="h-6 w-6" />
                  {totalQuantity > 0 && (
                    <span className={`absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold ${badgeClass}`}>
                      {totalQuantity}
                    </span>
                  )}
                </button>

                {/* Mobile menu button */}
                <button
                  type="button"
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-nav-panel"
                  className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 lg:hidden ${iconClass}`}
                  onClick={() => setIsMenuOpen((o) => !o)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay (z-140) and panel (z-145) below header */}
      <div
        className={`lg:hidden fixed inset-0 z-[400] transition-opacity duration-300 ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 hidden'
          }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />

        {/* Floating glass panel */}
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          className={`
      absolute top-2 left-2 right-2 z-[405]
      rounded-2xl ring-1 ring-black/5 shadow-xl
      bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur-xl
      transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
      ${isMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'}
    `}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-signerica text-gray-900">
              KYRO
            </Link>
            <button className="p-2 rounded-md text-gray-700 hover:bg-white/70 transition" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="px-2 pb-4">
            {[...navLinks, { name: 'Account', path: '/account/login' }, { name: 'Cart', path: '/cart' }].map((link, idx) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${idx * 40}ms` }}
                className={({ isActive }) =>
                  `
            block rounded-xl px-4 py-3 text-lg font-medium 
            transition-all duration-300 will-change-transform
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
            ${isActive ? 'bg-white/70 text-gray-900' : 'text-gray-800 hover:bg-white/60'}
          `
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
