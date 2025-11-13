// src/pages/CartPage.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, decrementQuantity, removeFromCart } from '../features/cart/cartSlice';

// A simple Trash icon component
const TrashIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09c-1.18 0-2.09.954-2.09 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);


const CartPage = () => {
  // Use useSelector to get the cart data from the Redux store
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // --- HANDLER FUNCTIONS ---
  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleIncrement = (item) => {
    // Our addToCart reducer intelligently handles incrementing
    dispatch(addToCart(item));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };


  // --- RENDER LOGIC ---

  // 1. Handle the Empty Cart case
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 sm:py-32 px-4">
        <h1 className="text-3xl font-light text-gray-900">Your Cart is Empty</h1>
        <p className="mt-4 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-gray-900 text-white py-3 px-12 text-sm font-medium tracking-wider uppercase transition-colors hover:bg-gray-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // 2. Render the cart with items
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        
        <div className="mt-12">
          <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
            {items.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 rounded-md object-cover sm:w-32 sm:h-32"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-sm">
                        <Link to={`/products/${product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                          {product.name}
                        </Link>
                      </h4>
                      <p className="ml-4 text-sm font-medium text-gray-900">${product.totalPrice.toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">${product.price.toFixed(2)} each</p>
                  </div>
                  
                  <div className="mt-4 flex-1 flex items-end justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-300 rounded">
                      <button onClick={() => handleDecrement(product.id)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                      <span className="px-4 py-1 text-sm">{product.quantity}</span>
                      <button onClick={() => handleIncrement(product)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                    </div>
                    
                    <div className="ml-4">
                      <button onClick={() => handleRemove(product.id)} type="button" className="text-sm font-medium text-gray-500 hover:text-gray-800">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Order Summary */}
        <div className="mt-10 sm:ml-32 sm:pl-6">
          <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">${totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <p className="text-base font-medium text-gray-900">Order total</p>
                <p className="text-base font-medium text-gray-900">${totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Link
              to="/checkout" // This will be your next step
              className="w-full bg-gray-900 text-white py-3 px-4 text-base font-medium tracking-wider uppercase transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 flex items-center justify-center rounded-md"
            >
              Checkout
            </Link>
          </div>
          
          <div className="mt-6 text-sm text-center">
            <p>
              or{' '}
              <Link to="/shop" className="font-medium text-gray-700 hover:text-gray-800">
                Continue Shopping<span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;