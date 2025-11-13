// src/components/cart/CartDrawer.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCartOpen, addToCart, decrementQuantity, removeFromCart } from '../../src/features/cart/cartSlice';

// --- ICONS ---
const CloseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TrashIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09c-1.18 0-2.09.954-2.09 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isCartOpen, items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  // 🧠 Disable body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleClose = () => dispatch(setCartOpen(false));
  const handleDecrement = (id) => dispatch(decrementQuantity(id));
  const handleIncrement = (item) => dispatch(addToCart(item));
  const handleRemove = (id) => dispatch(removeFromCart(id));

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300
                    ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* DRAWER PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
                    ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Cart ({totalQuantity})</h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Close panel</span>
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length > 0 ? (
              <ul className="-my-6 divide-y divide-gray-200">
                {items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/products/${product.id}`} onClick={handleClose}>
                              {product.name}
                            </Link>
                          </h3>
                          <p className="ml-4">${product.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button onClick={() => handleDecrement(product.id)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                            -
                          </button>
                          <span className="px-4 py-1">{product.quantity}</span>
                          <button onClick={() => handleIncrement(product)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                            +
                          </button>
                        </div>
                        <div className="flex">
                          <button
                            onClick={() => handleRemove(product.id)}
                            type="button"
                            className="font-medium text-gray-500 hover:text-gray-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center h-full flex flex-col justify-center">
                <p className="text-gray-500">Your cart is empty.</p>
                <Link to="/shop" onClick={handleClose} className="mt-4 font-medium text-gray-700 hover:text-gray-800">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Footer with Summary & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  onClick={handleClose}
                  className="flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
