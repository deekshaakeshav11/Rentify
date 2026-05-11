import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ cart, rentItems }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div style={nav}>
      {/* LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={require("../rentify logo.jpeg")}
          alt="Rentify Logo"
          style={{ height: "45px", width: "45px", objectFit: "contain", borderRadius: "8px" }}
        />
        <h2 style={{ color: "#ff6b35", margin: 0, fontSize: "24px", letterSpacing: "1px" }}>Rentify</h2>
      </div>

      {/* CENTER LINKS */}
      <div style={centerLinks}>
        <Link style={link} to="/">🏠 Home</Link>
        <Link style={link} to="/cart">
          🛒 Cart
          {cart.length > 0 && <span style={countBadge}>{cart.length}</span>}
        </Link>
        <Link style={link} to="/rent">
          📦 Rentals
          {rentItems.length > 0 && <span style={countBadge}>{rentItems.length}</span>}
        </Link>
        <Link style={link} to="/wishlist">❤️ Wishlist</Link>
      </div>

      {/* RIGHT - USER PROFILE */}
      {user ? (
        <div style={{ position: "relative" }}>
          <div
            style={profileBtn}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div style={avatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}>
              {user.name}
            </span>
            <span style={{ color: "#ff6b35", fontSize: "12px" }}>▾</span>
          </div>

          {/* DROPDOWN */}
          {dropdownOpen && (
            <div style={dropdown}>
              {/* USER INFO */}
              <div style={dropdownHeader}>
                <div style={{ ...avatar, width: "45px", height: "45px", fontSize: "20px" }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: "bold", color: "white", fontSize: "14px" }}>{user.name}</p>
                  <p style={{ margin: 0, fontSize: "11px", color: "#aaa" }}>{user.email}</p>
                </div>
              </div>

              <div style={divider} />

              <Link to="/cart" style={dropdownItem} onClick={() => setDropdownOpen(false)}>
                🛒 Cart <span style={badge}>{cart.length}</span>
              </Link>
              <Link to="/rent" style={dropdownItem} onClick={() => setDropdownOpen(false)}>
                📦 My Rentals <span style={badge}>{rentItems.length}</span>
              </Link>
              <Link to="/wishlist" style={dropdownItem} onClick={() => setDropdownOpen(false)}>
                ❤️ Wishlist
              </Link>

              <div style={divider} />

              <div style={{ ...dropdownItem, color: "#e74c3c" }} onClick={handleLogout}>
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link style={loginBtn} to="/login">Login</Link>
      )}
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 40px",
  background: "linear-gradient(to right, #0f0f0f, #1a1a1a)",
  color: "white",
  position: "sticky",
  top: 0,
  zIndex: 100,
  boxShadow: "0 2px 20px rgba(255,107,53,0.15)",
  borderBottom: "1px solid #222"
};

const centerLinks = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  background: "#111",
  padding: "8px 15px",
  borderRadius: "30px",
  border: "1px solid #222"
};

const link = {
  position: "relative",
  padding: "8px 14px",
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  borderRadius: "20px",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  gap: "5px"
};

const countBadge = {
  background: "#ff6b35",
  color: "white",
  borderRadius: "50%",
  width: "18px",
  height: "18px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  fontWeight: "bold",
  marginLeft: "3px"
};

const profileBtn = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  background: "#1a1a1a",
  border: "1px solid #333",
  padding: "8px 14px",
  borderRadius: "30px",
  cursor: "pointer",
  transition: "0.2s"
};

const avatar = {
  width: "32px",
  height: "32px",
  background: "#ff6b35",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
  fontSize: "14px"
};

const dropdown = {
  position: "absolute",
  right: 0,
  top: "55px",
  background: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: "14px",
  width: "230px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  zIndex: 999,
  overflow: "hidden"
};

const dropdownHeader = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "15px"
};

const dropdownItem = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 15px",
  color: "white",
  textDecoration: "none",
  cursor: "pointer",
  fontSize: "14px",
  transition: "0.2s"
};

const divider = {
  height: "1px",
  background: "#333"
};

const badge = {
  background: "#ff6b35",
  color: "white",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "11px",
  fontWeight: "bold"
};

const loginBtn = {
  padding: "10px 20px",
  background: "#ff6b35",
  border: "none",
  borderRadius: "20px",
  color: "white",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "14px"
};

export default Navbar;