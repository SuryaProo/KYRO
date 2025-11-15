import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/shop/ProductCard';
import { products as allProducts } from '../data/products';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const ShopPage = () => {
  const q = useQuery();
  const concern = q.get('concern'); // e.g., 'acne', 'dryness', etc.

  const products = useMemo(() => {
    if (!concern) return allProducts;
    return allProducts.filter((p) => p.concerns?.includes(concern));
  }, [concern]);

  const title = concern
    ? `Shop by Concern: ${concern.charAt(0).toUpperCase() + concern.slice(1)}`
    : 'All Products';

  return (
    <div className="py-16 sm:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-center mb-12">{title}</h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center">No products found for this concern.</p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;