// src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/home/AnimatedSection';

const heroImage =
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop'; // replace with your brand image
const imgBarrier =
  'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa0?q=80&w=1600&auto=format&fit=crop';
const imgLessSteps =
  'https://images.unsplash.com/photo-1512203492609-8f411d88ccb0?q=80&w=1600&auto=format&fit=crop';
const imgDerm =
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop';
const imgFounder =
  'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1600&auto=format&fit=crop';

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* HERO (dark for navbar contrast) */}
      <section
        data-nav-theme="dark"
        className="relative h-[70vh] md:h-[80vh] overflow-hidden"
      >
        <img
          src={heroImage}
          alt="KYRO hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />

        <div className="relative z-10 h-full">
          <div className="mx-auto max-w-7xl px-4 md:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <p className="uppercase tracking-widest text-sm text-white/90">
                About KYRO
              </p>
              <h1 className="mt-3 text-4xl md:text-6xl font-light text-white">
                Skincare, simplified.
              </h1>
              <p className="mt-4 text-white/90 max-w-xl">
                Uncomplicated luxury for your skin — effective, barrier-first
                formulas designed to fit your life and feel incredible.
              </p>
              <div className="mt-8">
                <Link
                  to="/shop"
                  className="inline-block bg-white text-gray-900 px-8 py-3 text-sm font-medium tracking-wider uppercase rounded-md hover:bg-gray-100 transition"
                >
                  Shop KYRO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <AnimatedSection>
        <div className="mx-auto max-w-3xl px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light">Our philosophy</h2>
          <p className="mt-5 text-lg text-gray-700">
            At KYRO, we believe less is more. We focus on a tight edit of
            powerhouse formulas that support the skin barrier, deliver visible
            results, and layer beautifully. No 12-step routines — just what
            works.
          </p>
        </div>
      </AnimatedSection>

      {/* Feature: Barrier-first */}
      <AnimatedSection>
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6">
            <img
              src={imgBarrier}
              alt="Barrier-first formulas"
              className="w-full h-[420px] md:h-[520px] object-cover rounded-2xl"
            />
          </div>
          <div className="md:col-span-6">
            <h3 className="text-2xl md:text-3xl font-light">Barrier-first formulas</h3>
            <p className="mt-4 text-gray-700">
              Healthy skin starts with a strong barrier. Our formulas work with
              your skin — not against it — to hydrate, soothe, and protect with
              clinically-respected ingredients.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Feature: Less steps, better skin */}
      <AnimatedSection>
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 md:order-2">
            <img
              src={imgLessSteps}
              alt="Less steps, better skin"
              className="w-full h-[420px] md:h-[520px] object-cover rounded-2xl"
            />
          </div>
          <div className="md:col-span-6 md:order-1">
            <h3 className="text-2xl md:text-3xl font-light">Less steps, better skin</h3>
            <p className="mt-4 text-gray-700">
              We edit the noise so you don’t have to. Each product is designed
              to stand on its own or pair seamlessly with the rest of your
              routine for effortless results.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Feature: Derm-tested */}
      <AnimatedSection>
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6">
            <img
              src={imgDerm}
              alt="Derm-tested"
              className="w-full h-[420px] md:h-[520px] object-cover rounded-2xl"
            />
          </div>
          <div className="md:col-span-6">
            <h3 className="text-2xl md:text-3xl font-light">Derm-tested, thoughtful ingredients</h3>
            <p className="mt-4 text-gray-700">
              We formulate with proven actives at mindful levels, tested for
              safety and performance. Always vegan, cruelty-free, and
              dermatologist-tested.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Values grid */}
      <AnimatedSection>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h3 className="text-2xl md:text-3xl font-light text-center">What we stand for</h3>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="rounded-2xl border border-gray-200 p-6 text-center">
              <div className="text-2xl">🌱</div>
              <p className="mt-3 font-medium">Vegan</p>
              <p className="text-sm text-gray-600 mt-1">Plant-based, no animal byproducts.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 text-center">
              <div className="text-2xl">🐰</div>
              <p className="mt-3 font-medium">Cruelty-Free</p>
              <p className="text-sm text-gray-600 mt-1">Never tested on animals.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 text-center">
              <div className="text-2xl">🧪</div>
              <p className="mt-3 font-medium">Derm-Tested</p>
              <p className="text-sm text-gray-600 mt-1">Safety and performance validated.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 text-center">
              <div className="text-2xl">♻️</div>
              <p className="mt-3 font-medium">Responsible</p>
              <p className="text-sm text-gray-600 mt-1">Thoughtful sourcing and packaging.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Founder note */}
      <AnimatedSection>
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <img
              src={imgFounder}
              alt="Founder"
              className="w-full h-[420px] md:h-[520px] object-cover rounded-2xl"
            />
          </div>
          <div className="md:col-span-7">
            <p className="uppercase tracking-widest text-sm text-gray-500">From our founder</p>
            <h3 className="mt-2 text-2xl md:text-3xl font-light">
              “KYRO is about taking the guesswork out of skincare — giving you
              fewer decisions and better results.”
            </h3>
            <p className="mt-4 text-gray-700">
              We created KYRO to bring elevated care to everyday routines. We
              obsess over texture, performance, and ingredient integrity — so
              your skin can look and feel its best with minimal effort.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection>
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-10 md:p-16">
            <h3 className="text-2xl md:text-3xl font-light">Ready for glazed, balanced skin?</h3>
            <p className="mt-3 text-gray-700">Explore our bestsellers and build your routine.</p>
            <div className="mt-8">
              <Link
                to="/shop"
                className="inline-block bg-gray-900 text-white px-10 py-3 rounded-md text-sm font-medium tracking-wider uppercase hover:bg-gray-700 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AboutPage;