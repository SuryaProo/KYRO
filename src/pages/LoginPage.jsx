// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import videoFile from "../images/hero.mp4"; // your video file path

const bannerImage =
  "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1600&auto=format&fit=crop";

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F4F3F1] overflow-hidden relative">
      {/* LEFT IMAGE (hidden on mobile) */}
      <div className="relative hidden md:block w-1/2 h-screen overflow-hidden">
        <img
          src={bannerImage}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-12 left-10 text-white text-4xl font-light leading-snug max-w-sm drop-shadow-lg">
          It’s time to invest in your <strong>SKIN.</strong>
        </div>
      </div>

      {/* RIGHT SIDE (form + video background) */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 overflow-hidden min-h-screen">
        {/* VIDEO BACKGROUND */}
        <video
          src={videoFile}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 w-full h-full object-cover blur-sm opacity-60"
        />

        {/* Soft overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-[#F4F3F1]/40 backdrop-blur-[1px]" />

        {/* FORM CONTAINER */}
        <div className="relative w-full max-w-sm md:max-w-md z-10 py-10 md:py-0">
          {isLoginView ? (
            <>
              <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
                Login
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 bg-white/80 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 backdrop-blur-sm"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 bg-white/80 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 backdrop-blur-sm"
                  required
                />

                <div className="flex justify-end">
                  <Link
                    to="/forgot"
                    className="text-sm underline text-gray-700 hover:text-gray-900"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full border border-gray-800 py-3 rounded-md text-gray-800 font-semibold uppercase tracking-wide hover:bg-gray-800 hover:text-white transition"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-700">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLoginView(false)}
                  className="underline font-medium hover:text-gray-900"
                >
                  Sign up!
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
                Create Account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="border border-gray-300 bg-white/80 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 backdrop-blur-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border border-gray-300 bg-white/80 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 backdrop-blur-sm"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 bg-white/80 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 backdrop-blur-sm"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 bg-white/80 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 backdrop-blur-sm"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-3 rounded-md font-semibold uppercase tracking-wide hover:bg-gray-700 transition"
                >
                  Create
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-700">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLoginView(true)}
                  className="underline font-medium hover:text-gray-900"
                >
                  Sign in
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
