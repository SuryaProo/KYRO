// src/components/cart/CartDrawer.jsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setCartOpen,
  addToCart,
  decrementQuantity,
  removeFromCart,
} from '../../src/features/cart/cartSlice';

// === ICONS ===
const CloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TrashIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 
      19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 
      0 01-2.244-2.077L4.772 5.79m14.456 
      0a48.108 48.108 0 00-3.478-.397m-12 
      .562c.34-.059.68-.114 
      1.022-.165m0 0a48.11 48.11 0 
      013.478-.397m7.5 
      0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09c-1.18 
      0-2.09.954-2.09 2.134v.916m7.5 
      0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

// === COMPONENT ===
const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isCartOpen, items, totalQuantity, totalAmount } = useSelector((s) => s.cart);

  const handleClose = () => dispatch(setCartOpen(false));
  const handleDecrement = (id) => dispatch(decrementQuantity(id));
  const handleIncrement = (item) => dispatch(addToCart(item));
  const handleRemove = (id) => dispatch(removeFromCart(id));

  // Disable scroll + ESC close
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isCartOpen]);

  // Swipe-to-close for mobile
  const panelRef = useRef(null);
  const startX = useRef(0);
  const dragging = useRef(false);

  const onTouchStart = (e) => {
    if (!isCartOpen) return;
    dragging.current = true;
    startX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    if (!dragging.current || !panelRef.current) return;
    const dx = e.touches[0].clientX - startX.current;
    if (dx > 0) {
      const translate = Math.min(dx, 120);
      panelRef.current.style.transform = `translateX(${translate}px)`;
      panelRef.current.style.opacity = `${Math.max(0.6, 1 - translate / 400)}`;
    }
  };

  const onTouchEnd = () => {
    if (!panelRef.current) return;
    dragging.current = false;
    const match = panelRef.current.style.transform.match(/translateX\(([-\d.]+)px\)/);
    const delta = match ? parseFloat(match[1]) : 0;
    if (delta > 80) handleClose();
    panelRef.current.style.transform = '';
    panelRef.current.style.opacity = '';
  };

  // === PORTAL RENDER ===
  return createPortal(
    <>
      {/* Backdrop (above navbar) */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-[500] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${isCartOpen ? 'opacity-100' : 'opacity-0 hidden'
          }`}
      />

      {/* Panel container */}
      <div
        className={`fixed inset-0 z-[510] pointer-events-none transition-opacity duration-300 ease-out ${isCartOpen ? 'opacity-100' : 'opacity-0 hidden'
          }`}
      >
        <div
          ref={panelRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className={`
            absolute top-2 bottom-2 right-2 left-2 md:left-auto md:w-[28rem]
            pointer-events-auto
            rounded-2xl ring-1 ring-black/5 shadow-xl
            bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur-2xl
            transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isCartOpen ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-5 scale-95 opacity-0'}
          `}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/60">
            <h2 className="text-lg font-medium text-gray-900">
              Cart ({totalQuantity})
            </h2>
            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <Link
                  to="/checkout"
                  onClick={handleClose}
                  className="hidden sm:inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Checkout
                </Link>
              )}
              <button
                onClick={handleClose}
                className="p-2 rounded-md hover:bg-white/70 transition"
                aria-label="Close cart"
              >
                <CloseIcon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* BODY: Cart Items */}
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {items.length > 0 ? (
                <ul className="-my-4 divide-y divide-gray-200/70">
                  {items.map((product) => (
                    <li key={product.id} className="flex py-4 gap-3">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                          <Link
                            to={`/products/${product.id}`}
                            onClick={handleClose}
                            className="hover:opacity-80"
                          >
                            {product.name}
                          </Link>
                          <p>${product.totalPrice.toFixed(2)}</p>
                        </div>

                        <p className="text-xs text-gray-500 mt-0.5">
                          ${product.price.toFixed(2)} each
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() => handleDecrement(product.id)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{product.quantity}</span>
                            <button
                              onClick={() => handleIncrement(product)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemove(product.id)}
                            className="p-2 text-gray-500 hover:text-gray-800"
                            aria-label="Remove"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center h-full flex flex-col justify-center">
                  <p className="text-gray-500">Your cart is empty.</p>
                  <Link
                    to="/shop"
                    onClick={handleClose}
                    className="mt-4 font-medium text-gray-700 hover:text-gray-800"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* FOOTER (Sticky Checkout) */}
            {items.length > 0 && (
              <div className="sticky bottom-0 bg-white/70 backdrop-blur border-t border-white/60 p-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${totalAmount.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-800 hover:bg-white/70 transition"
                  >
                    Close
                  </button>
                  <Link
                    to="/checkout"
                    onClick={handleClose}
                    className="flex-1 flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-gray-700"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default CartDrawer;
