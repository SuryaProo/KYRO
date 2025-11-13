// src/pages/ShopPage.jsx

import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/shop/ProductCard';

// --- MOCK DATA ---
// This should be the full list of your products.
// In the future, this will come from an API call: `axios.get('/api/products')`
const allProducts = [
  { id: 'prod_1', name: 'Peptide Glazing Fluid', price: 29.00, image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/PGF_PDP_Primary_1000x.jpg', hoverImage: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/rhode-pdp-brc-secondary-carousel-1_1000x.jpg' },
  { id: 'prod_2', name: 'Barrier Restore Cream', price: 29.00, image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/BRC_PDP_Primary_21bc391a-7b56-4b0a-8692-0b162aaa9522_1000x.jpg', hoverImage: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/rhode-pdp-brc-secondary-carousel-2_1000x.jpg' },
  { id: 'prod_3', name: 'Peptide Lip Treatment', price: 16.00, image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/PLT_PDP_Primary_Unflavored_1000x.jpg', hoverImage: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/rhode-pdp-lip-secondary-carousel-1_1000x.jpg' },
  { id: 'prod_4', name: 'Pineapple Refresh Cleanser', price: 28.00, image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/Pineapple_PDP_Primary_2_1000x.jpg', hoverImage: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/rhode-pdp-pineapple-secondary-carousel-1_1000x.jpg' },
  { id: 'prod_5', name: 'Glazing Milk', price: 29.00, image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/GM_PDP_Primary_1_1000x.jpg', hoverImage: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/rhode-pdp-glazing-milk-secondary-carousel-1_1000x.jpg' },
];
// --- END MOCK DATA ---

const ShopPage = () => {
  const [products, setProducts] = useState([]);

  // Simulate fetching data when the component mounts
  useEffect(() => {
    // In a real app, you'd fetch this from your API
    // e.g., axios.get('/api/products').then(res => setProducts(res.data));
    setProducts(allProducts);
  }, []);

  return (
    <div className="py-16 sm:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-center mb-12">All Products</h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center">Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;