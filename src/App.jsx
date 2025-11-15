// src/App.jsx

import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout components
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CartDrawer from "../components/cart/CartDrawer";

// Pages
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* === Login Page (Standalone Layout) === */}
          <Route
            path="/account/login"
            element={
              <>
                <Navbar />
                <CartDrawer />
                <main data-nav-theme="light" className="bg-[#F7F7F7] text-black min-h-screen">
                  <LoginPage />
                </main>
                <Footer />
              </>
            }
          />

          {/* === Forgot Password Page (Standalone Layout) === */}
          <Route
            path="/account/forgot"
            element={
              <>
                <Navbar />
                <CartDrawer />
                <main data-nav-theme="light" className="bg-[#F7F7F7] text-black min-h-screen">
                  <ForgotPasswordPage />
                </main>
                <Footer />
              </>
            }
          />

          {/* === Main App Layout === */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <CartDrawer />
                <main data-nav-theme="light" className="bg-white text-black min-h-screen">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
