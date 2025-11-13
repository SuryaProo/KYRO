// src/pages/HomePage.jsx

import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../../components/shop/ProductCard';
import { BRAND } from '../constant/Brand';

gsap.registerPlugin(ScrollTrigger);

// --- MOCK DATA ---
// This data will eventually come from your backend API
const featuredProducts = [
  { id: 'prod_1', name: 'Peptide Glazing Fluid', price: 29.00, image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/PGF_PDP_Primary_1000x.jpg', hoverImage: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/rhode-pdp-brc-secondary-carousel-1_1000x.jpg' },
  { id: 'prod_2', name: 'Barrier Restore Cream', price: 29.00, image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/BRC_PDP_Primary_21bc391a-7b56-4b0a-8692-0b162aaa9522_1000x.jpg', hoverImage: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/rhode-pdp-brc-secondary-carousel-2_1000x.jpg' },
  { id: 'prod_3', name: 'Peptide Lip Treatment', price: 16.00, image: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/PLT_PDP_Primary_Unflavored_1000x.jpg', hoverImage: 'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/rhode-pdp-lip-secondary-carousel-1_1000x.jpg' },
];
// --- END MOCK DATA ---

const HomePage = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Animate Hero Section Text
      gsap.from("#hero-text > *", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        delay: 0.5,
      });

      // Animate sections on scroll
      const sections = document.querySelectorAll(".animated-section");
      sections.forEach(section => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center bg-gray-100">
        {/* You can place a large background image here */}
        <div id="hero-text" className="z-10 text-gray-900">
          <h1 className="text-5xl md:text-7xl font-serif">
            {/* Make sure you've added the Signerica font */}
            {BRAND.name}
          </h1>
          <p className="mt-4 text-lg md:text-xl">
           {BRAND.tagline}
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block bg-gray-900 text-white py-3 px-12 text-sm font-medium tracking-wider uppercase transition-colors hover:bg-gray-700"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 md:px-8 animated-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50 animated-section">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-4">Our Philosophy</h2>
            <p className="text-lg text-gray-700">
              At Suprache, we believe in the power of simplicity. Our curated formulas are designed with effective, high-quality ingredients to deliver visible results without the complexity. One dewy, glazed layer at a time.
            </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;