import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, setCartOpen } from '../features/cart/cartSlice';
import { getProductById, products } from '../data/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const found = getProductById(id);
    setProduct(found || null);
    setActiveIdx(0);
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product));
    dispatch(setCartOpen(true));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 1500);
  };

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Product not found.</p>
        <Link to="/shop" className="ml-4 underline">Go back to shop</Link>
      </div>
    );
  }

  const mainImage = product.images?.[activeIdx] || product.image;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
      {showNotification && (
        <div className="fixed top-20 right-5 bg-black text-white py-2 px-4 rounded-md shadow-lg z-50">
          {product.name} added to cart!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {/* Gallery */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-2xl border border-gray-200">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images?.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={img + idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative aspect-square overflow-hidden rounded-xl border ${idx === activeIdx ? 'border-gray-900' : 'border-gray-200'}`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="mt-8 md:mt-0">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900">{product.name}</h1>
          <div className="mt-3">
            <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
          </div>
          <div className="mt-6 text-base text-gray-700 space-y-4">
            <p>{product.description}</p>
          </div>

          {product.ingredients?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Ingredients</h3>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-600">
                {product.ingredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>
          )}

          {product.howToUse && (
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">How to Use</h3>
              <p className="mt-3 text-sm text-gray-600">{product.howToUse}</p>
            </div>
          )}

          <div className="mt-10">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 px-8 text-base font-medium tracking-wider uppercase rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                ${product.stock === 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-700'}
              `}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          {/* You might also like */}
          <div className="mt-12 border-t border-gray-200 pt-10">
            <h3 className="text-lg font-medium text-gray-900">You might also like</h3>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {products
                .filter((p) => p.id !== product.id)
                .slice(0, 2)
                .map((p) => (
                  <Link key={p.id} to={`/products/${p.id}`} className="block">
                    <div className="aspect-square overflow-hidden rounded-xl border border-gray-200">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{p.name}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;