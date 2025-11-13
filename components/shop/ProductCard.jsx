// src/components/shop/ProductCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, setCartOpen } from '../../src/features/cart/cartSlice';

// The 'product' prop will be an object with { id, name, price, image }
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    // Stop the click from navigating to the product page
    e.preventDefault();
    e.stopPropagation();

    // Add the product to cart
    dispatch(addToCart(product));

    // Open the cart drawer immediately
    dispatch(setCartOpen(true));

    // Optional: console feedback
    console.log(`${product.name} added to cart!`);
  };

  return (
    // Link the entire card to the product's detail page
    <Link to={`/products/${product.id}`} className="group block overflow-hidden">
      <div className="relative h-[350px] sm:h-[450px]">
        <img
          src={product.image}
          alt={`Image of ${product.name}`}
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
        />
        <img
          src={product.hoverImage || product.image} // Use a hover image if available
          alt={`Hover image of ${product.name}`}
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      <div className="relative pt-3 bg-white text-gray-900">
        <h3 className="text-sm">{product.name}</h3>
        <p className="mt-1.5 tracking-wide text-lg">${product.price.toFixed(2)}</p>

        <div className="mt-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-900 text-white py-2 px-4 text-sm font-medium tracking-wider uppercase transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
