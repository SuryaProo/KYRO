// src/pages/HomePage.jsx
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../../components/home/AnimatedSection';
import ProductCard from '../../components/shop/ProductCard';
import { getFeaturedProducts } from '../data/products';
import { products as allProducts } from '../data/products';
import { useHeaderHeight } from '../hook/useHeaderHeight';
import { addToCart, setCartOpen } from '../features/cart/cartSlice';
import heroVideo from '../images/hero.mp4';

gsap.registerPlugin(ScrollTrigger);

const concerns = [
  { key: 'acne', label: 'Acne', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop' },
  { key: 'pigmentation', label: 'Pigmentation', image: 'https://images.unsplash.com/photo-1604908177223-cdf21c27369a?q=80&w=800&auto=format&fit=crop' },
  { key: 'dryness', label: 'Dryness', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop' },
  { key: 'sensitivity', label: 'Sensitivity', image: 'https://images.unsplash.com/photo-1512252117810-248b76a747e1?q=80&w=800&auto=format&fit=crop' },
  { key: 'anti-aging', label: 'Anti-aging', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop' },
];

const HomePage = () => {
  const comp = useRef(null);
  const dispatch = useDispatch();
  useHeaderHeight();

  // Featured products (always show 3)
  const featuredRaw = getFeaturedProducts();
  const featuredToShow =
    featuredRaw.length >= 3 ? featuredRaw.slice(0, 3) : allProducts.slice(0, 3);

  // Hero/New product
  const heroProduct =
    allProducts.find((p) => p.tags?.includes('hero') || p.tags?.includes('new')) ||
    featuredToShow[0] ||
    allProducts[0];

  // Best sellers (3–4)
  const bestSellersRaw = allProducts.filter((p) => p.tags?.includes('bestseller'));
  const bestSellers = bestSellersRaw.length ? bestSellersRaw.slice(0, 4) : allProducts.slice(0, 4);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('#hero-text > *', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        delay: 0.3,
      });
      document.querySelectorAll('.animated-section').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  const handleQuickAdd = (product) => {
    dispatch(addToCart(product));
    dispatch(setCartOpen(true));
  };

  return (
    <div ref={comp}>
      {/* Hero Section (video) */}
      <section data-nav-theme="dark" className="relative min-h-[100svh] md:min-h-screen overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
          aria-hidden="true"
        >
          {/* <source src="/hero.webm" type="video/webm" /> */}
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Top gradient and dark overlay for readability */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-black/10" />

        {/* Content: push down by navbar height and center in remaining space */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 pt-[var(--nav-h,64px)]">
          <div className="min-h-[calc(100svh-var(--nav-h,64px))] md:min-h-[calc(100vh-var(--nav-h,64px))] flex items-center justify-center text-center">
            <div id="hero-text" className="text-white">
              <h1 className="text-5xl md:text-7xl font-signerica">KYRO</h1>
              <p className="mt-4 text-lg md:text-xl">Uncomplicated luxury for your skin.</p>
              <Link
                to="/shop"
                className="mt-8 inline-block bg-gray-900 text-white py-3 px-12 text-sm font-medium tracking-wider uppercase transition-colors hover:bg-gray-700"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Featured Product / New Launch */}
      <AnimatedSection>
        <section className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <div className="aspect-square overflow-hidden rounded-2xl border border-gray-200">
                <img src={heroProduct?.image} alt={heroProduct?.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-5">
              <p className="uppercase tracking-widest text-xs text-gray-500">New Launch</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-light">{heroProduct?.name}</h2>
              <p className="mt-3 text-gray-700">{heroProduct?.description}</p>
              <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
                <li>Boosts barrier function</li>
                <li>Deep, long-lasting hydration</li>
                <li>Layers flawlessly under makeup</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleQuickAdd(heroProduct)}
                  className="rounded-md bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-700"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/products/${heroProduct?.id}`}
                  className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100"
                >
                  Learn More
                </Link>
              </div>

              {/* Optional texture GIF (show if you have one) */}
              {/* {heroProduct.textureGif && (
                <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
                  <img src={heroProduct.textureGif} alt="Texture" className="w-full object-cover" />
                </div>
              )} */}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 4) Shop by Concern */}
      <AnimatedSection>
        <section className="mx-auto max-w-7xl px-4 md:px-8">
          <h3 className="text-2xl md:text-3xl font-light text-center">Shop by Concern</h3>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {concerns.map((c) => (
              <Link
                key={c.key}
                to={`/shop?concern=${c.key}`}
                className="group relative rounded-2xl overflow-hidden border border-gray-200 hover:shadow transition"
              >
                <img src={c.image} alt={c.label} className="h-40 w-full object-cover transition group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                  <span className="inline-block rounded-md bg-white px-3 py-1 text-sm font-medium">
                    {c.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* 5) Ingredient Philosophy / Science */}
      <AnimatedSection>
        <section className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <h3 className="text-2xl md:text-3xl font-light">We formulate with purpose</h3>
              <p className="mt-3 text-gray-700">
                Thoughtful actives at mindful levels — tested for safety and performance.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="font-medium">Niacinamide</p>
                  <p className="text-sm text-gray-600 mt-1">Brightens & strengthens the skin barrier.</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="font-medium">Hyaluronic Acid</p>
                  <p className="text-sm text-gray-600 mt-1">Multi-weight hydration that plumps.</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="font-medium">Ceramides</p>
                  <p className="text-sm text-gray-600 mt-1">Barrier repair and resilience.</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="font-medium">Peptides</p>
                  <p className="text-sm text-gray-600 mt-1">Support firm, bouncy-looking skin.</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop"
                  alt="Lab / texture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 6) Best Sellers */}
      <AnimatedSection>
        <section className="mx-auto max-w-7xl px-4 md:px-8">
          <h3 className="text-2xl md:text-3xl font-light text-center">Best Sellers</h3>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((p) => (
              <div key={p.id} className="group rounded-2xl overflow-hidden border border-gray-200 bg-white">
                <Link to={`/products/${p.id}`} className="block">
                  <div className="relative h-64">
                    <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition" />
                    <img src={p.hoverImage || p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </Link>
                <div className="p-4">
                  <h4 className="font-medium">{p.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {p.tags?.includes('hydration') ? 'Deep hydration' : 'Barrier support'}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-medium">${p.price.toFixed(2)}</p>
                    <button
                      onClick={() => handleQuickAdd(p)}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* 7) Customer Testimonials */}
      <AnimatedSection>
        <section className="mx-auto max-w-7xl px-4 md:px-8">
          <h3 className="text-2xl md:text-3xl font-light text-center">What customers say</h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-200 p-6 bg-white">
                <div className="text-yellow-500 text-lg">★★★★★</div>
                <p className="mt-3 text-gray-700">
                  “Helped my redness in 2 weeks. My skin feels calm and hydrated.”
                </p>
                <p className="mt-3 text-sm text-gray-500">— A.K.</p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* 8) About the Brand (Short Story) */}
      <AnimatedSection>
        <section className="mx-auto max-w-5xl px-4 md:px-8 text-center">
          <div className="rounded-2xl border border-gray-200 p-10 bg-white">
            <h3 className="text-2xl md:text-3xl font-light">Why we started KYRO</h3>
            <p className="mt-3 text-gray-700">
              We created KYRO to take the guesswork out of skincare — effective, barrier-first formulas
              that feel incredible and fit your life. Fewer steps, better results.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* 9) Education / Blog Teasers (Optional) */}
      <AnimatedSection>
        <section className="mx-auto max-w-7xl px-4 md:px-8">
          <h3 className="text-2xl md:text-3xl font-light text-center">Learn with KYRO</h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'How to build a morning routine', href: '#' },
              { title: 'Why barrier repair matters', href: '#' },
              { title: 'What is SPF 50+ PA++++?', href: '#' },
            ].map((post) => (
              <a key={post.title} href={post.href} className="block rounded-2xl border border-gray-200 p-6 hover:shadow bg-white transition">
                <h4 className="font-medium">{post.title}</h4>
                <p className="mt-2 text-sm text-gray-600">Read article →</p>
              </a>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* 10) Email Capture */}
      <AnimatedSection>
        <section className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="rounded-2xl border border-gray-200 p-8 bg-gray-50 text-center">
            <h3 className="text-2xl font-light">Get 10% off your first order</h3>
            <p className="mt-2 text-gray-600">Join the list — skincare tips, launches, and offers.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.currentTarget.elements.email.value;
                console.log('Subscribe:', email);
                e.currentTarget.reset();
              }}
              className="mt-6 flex gap-3 justify-center"
            >
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full max-w-xs px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
              />
              <button type="submit" className="rounded-md bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-700">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default HomePage;