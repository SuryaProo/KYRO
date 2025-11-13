// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, setCartOpen } from '../features/cart/cartSlice';

// --- MOCK DATA ---
// Replace this with API later
const allProducts = [
  {
    id: 'prod_1',
    name: 'Peptide Glazing Fluid',
    price: 29.0,
    image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/PGF_PDP_Primary_1000x.jpg',
    description:
      'The dewy hydration layer. A lightweight, quick-absorbing, gel serum that visibly plumps and hydrates to support a healthy-looking skin barrier.',
  },
  {
    id: 'prod_2',
    name: 'Barrier Restore Cream',
    price: 29.0,
    image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/BRC_PDP_Primary_21bc391a-7b56-4b0a-8692-0b162aaa9522_1000x.jpg',
    description:
      'The rich rescue cream. A rich, but lightweight, cream moisturizer to comfort, soothe, and restore the skin barrier. Our antioxidant peptide powerhouse.',
  },
  {
    id: 'prod_3',
    name: 'Peptide Lip Treatment',
    price: 16.0,
    image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/PLT_PDP_Primary_Unflavored_1000x.jpg',
    description:
      'The restorative lip layer. A restorative lip treatment for naturally plump, pillowy-soft lips — day or night. This dreamy formula leaves lips looking glossy.',
  },
  {
    id: 'prod_4',
    name: 'Pineapple Refresh Cleanser',
    price: 28.0,
    image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/Pineapple_PDP_Primary_2_1000x.jpg',
    description:
      'The gentle daily cleanser. A gentle, balm-to-lather cleanser that helps clear away dirt and oil without stripping moisture. Leaves skin clean, soft, and refreshed.',
  },
  {
    id: 'prod_5',
    name: 'Glazing Milk',
    price: 29.0,
    image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/GM_PDP_Primary_1_1000x.jpg',
    description:
      'The essential prep step. A lightweight, milky facial essence that boosts barrier function and provides immediate, luminous hydration. Your essential prep step.',
  },
];
// --- END MOCK DATA ---

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const foundProduct = allProducts.find((p) => p.id === id);
    setProduct(foundProduct);
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      dispatch(setCartOpen(true)); // 👈 opens the cart drawer
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500); // notification timeout
    }
  };

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Product not found.</p>
        <Link to="/shop" className="ml-4 underline">
          Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
      {/* "Added to Cart" Notification */}
      {showNotification && (
        <div className="fixed top-20 right-5 bg-black text-white py-2 px-4 rounded-md shadow-lg z-50">
          {product.name} added to cart!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {/* Image Column */}
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details Column */}
        <div className="mt-8 md:mt-0">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900">
            {product.name}
          </h1>

          <div className="mt-3">
            <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base text-gray-700">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-900 text-white py-3 px-8 text-base font-medium tracking-wider uppercase transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>

          {/* Extra section */}
          <div className="mt-10 border-t border-gray-200 pt-10">
            <h3 className="text-sm font-medium text-gray-900">How to Use</h3>
            <p className="mt-4 text-sm text-gray-500">
              After cleansing, apply a generous layer to your skin in the
              morning and at night for a glazed finish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
