import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Rent from "./pages/Rent";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import SplashScreen from "./components/SplashScreen";
import Payment from "./pages/Payment";

function App() {
  const [cart, setCart] = useState([]);
  const [rentItems, setRentItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showSplash, setShowSplash] = useState(false);

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  return (
    <>
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {!showSplash && (
        <>
          {isLoggedIn && <Navbar cart={cart} rentItems={rentItems} />}

          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? (
                <Home
                  cart={cart}
                  setCart={setCart}
                  rentItems={rentItems}
                  setRentItems={setRentItems}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              ) : (
                <Navigate to="/login" />
              )}
            />

            <Route
              path="/cart"
              element={isLoggedIn ? (
                <Cart cart={cart} setCart={setCart} />
              ) : (
                <Navigate to="/login" />
              )}
            />

            <Route
              path="/wishlist"
              element={isLoggedIn ? (
                <Wishlist
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  cart={cart}
                  setCart={setCart}
                  rentItems={rentItems}
                  setRentItems={setRentItems}
                />
              ) : (
                <Navigate to="/login" />
              )}
            />

            <Route
              path="/rent"
              element={isLoggedIn ? (
                <Rent rentItems={rentItems} setRentItems={setRentItems} />
              ) : (
                <Navigate to="/login" />
              )}
            />

            <Route
              path="/product/:id"
              element={isLoggedIn ? (
                <ProductDetail
                  cart={cart}
                  setCart={setCart}
                  rentItems={rentItems}
                  setRentItems={setRentItems}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              ) : (
                <Navigate to="/login" />
              )}
            />
            <Route
  path="/payment"
  element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
/>
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" /> : (
                <Login onLoginSuccess={() => setShowSplash(true)} />
              )}
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;