// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const bannerImage =
  'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1600&auto=format&fit=crop'; // replace with your image

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in...');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Signing up...');
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* LEFT: Image with grey overlay, fixed height (not too long) */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-72 md:h-[520px]">
            <img
              src={bannerImage}
              alt="KYRO skincare banner"
              className="h-full w-full object-cover"
            />
            {/* Grey overlay to match the page background vibe */}
            <div className="absolute inset-0 bg-gray-200/50" />
            {/* Optional subtle brand mark */}
            <div className="absolute bottom-4 left-4 text-gray-800">
              <h1 className="text-4xl font-signerica tracking-tight">KYRO</h1>
            </div>
          </div>

          {/* RIGHT: Auth panel on the same grey background */}
          <div className="bg-gray-50">
            {isLoginView ? (
              <>
                <h2 className="text-2xl font-light text-gray-900">Sign In</h2>
                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                  <div>
                    <label className="sr-only" htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                      required
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    {/* Transparent + small */}
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      Sign In
                    </button>

                    <Link
                      to="/account/forgot"
                      className="text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </form>

                <div className="mt-6 text-sm">
                  <p className="text-gray-600">
                    Don’t have an account?{' '}
                    <button
                      onClick={() => setIsLoginView(false)}
                      className="font-medium underline hover:text-gray-900"
                    >
                      Create one
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-light text-gray-900">Create Account</h2>
                <form onSubmit={handleSignUp} className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                      required
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                    required
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-gray-700 transition-colors"
                  >
                    Create
                  </button>
                </form>

                <div className="mt-6 text-sm">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={() => setIsLoginView(true)}
                      className="font-medium underline hover:text-gray-900"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;