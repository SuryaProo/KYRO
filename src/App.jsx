// src/App.jsx

// 1. Import the necessary tools
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages and layout components
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HomePage from "./pages/HomePage";
import CartDrawer from "../components/cart/CartDrawer";
import ShopPage from "./pages/ShopPage";
import AnimatedSection from "../components/home/AnimatedSection";
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Login Page (Standalone Layout) */}
          <Route
            path="/account/login"
            element={
              <>
                <Navbar />
                <CartDrawer />
                {/* Grey background for login page */}
               <main className="bg-gray-50 text-black">
                  <LoginPage />
                </main>
                <Footer />
              </>
            }
          />

          <Route path="/account/forgot" element={<ForgotPasswordPage />} />

          {/* Main App Layout */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <CartDrawer />
                <main className="bg-white text-black">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
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
