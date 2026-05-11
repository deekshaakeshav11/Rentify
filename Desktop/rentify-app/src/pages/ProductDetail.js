import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetail({ cart, setCart, rentItems, setRentItems, wishlist, setWishlist }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  if (!item) {
    return (
      <div style={{ background: "#0b0b0b", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", color: "white" }}>
          <p style={{ fontSize: "50px" }}>😕</p>
          <h2>Item not found!</h2>
          <button style={backBtn} onClick={() => navigate("/")}>Go Back</button>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.some((w) => w._id === item._id);

  const handleAddToCart = () => {
    setCart([...cart, item]);
    alert(`🛒 "${item.name}" added to cart!`);
  };

  const handleRentNow = () => {
    setRentItems([...rentItems, item]);
    alert(`📦 "${item.name}" added to rentals!`);
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      setWishlist(wishlist.filter((w) => w._id !== item._id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  return (
    <div style={container}>
      {/* BACK BUTTON */}
      <button style={backBtn} onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div style={detailBox}>
        {/* LEFT - IMAGE */}
        <div style={{ position: "relative" }}>
          <img
            src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
            alt={item.name}
            style={imgStyle}
          />
          {/* HEART */}
          <button
            style={{
              ...heartBtn,
              background: isWishlisted ? "#ff6b35" : "rgba(0,0,0,0.5)"
            }}
            onClick={handleWishlist}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        </div>

        {/* RIGHT - DETAILS */}
        <div style={details}>
          <h1 style={{ margin: "0 0 10px", color: "white" }}>{item.name}</h1>

          <p style={{ color: "#ff6b35", fontSize: "28px", fontWeight: "bold", margin: "0 0 15px" }}>
            ₹{item.price} <span style={{ fontSize: "14px", color: "#aaa" }}>/ day</span>
          </p>

          {/* CONDITION BADGE */}
          <span style={{
            ...conditionBadge,
            background: item.condition === "Poor" ? "#e74c3c"
              : item.condition === "Better" ? "#2ecc71"
              : "#f39c12"
          }}>
            {item.condition || "Good"} Condition
          </span>

          {/* CATEGORY */}
          <div style={infoRow}>
            <span style={infoLabel}>📁 Category</span>
            <span style={infoValue}>{item.category}</span>
          </div>

          {/* AVAILABILITY */}
          <div style={infoRow}>
            <span style={infoLabel}>✅ Availability</span>
            <span style={{ ...infoValue, color: item.isAvailable ? "#2ecc71" : "#e74c3c" }}>
              {item.isAvailable ? "Available" : "Not Available"}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div style={descBox}>
            <h3 style={{ color: "#ff6b35", margin: "0 0 8px" }}>📋 Description</h3>
            <p style={{ color: "#ccc", lineHeight: "1.6", margin: 0 }}>{item.description}</p>
          </div>

          {/* DETAILS TABLE */}
          <div style={descBox}>
            <h3 style={{ color: "#ff6b35", margin: "0 0 12px" }}>📌 Item Details</h3>
            <div style={infoRow}>
              <span style={infoLabel}>🏷️ Item Name</span>
              <span style={infoValue}>{item.name}</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>💰 Price</span>
              <span style={infoValue}>₹{item.price} / day</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>📦 Condition</span>
              <span style={infoValue}>{item.condition || "Good"}</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>🗂️ Category</span>
              <span style={infoValue}>{item.category}</span>
            </div>
            <div style={infoRow}>
              <span style={infoLabel}>📅 Listed On</span>
              <span style={infoValue}>{new Date(item.createdAt).toDateString()}</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button style={rentBtn} onClick={handleRentNow}>
              📦 Rent Now
            </button>
            <button style={cartBtn} onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const container = {
  background: "#0b0b0b",
  minHeight: "100vh",
  padding: "40px",
  color: "white"
};

const backBtn = {
  background: "transparent",
  border: "1px solid #ff6b35",
  color: "#ff6b35",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  marginBottom: "30px",
  fontSize: "14px"
};

const detailBox = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  background: "#1a1a1a",
  borderRadius: "20px",
  padding: "30px",
  border: "1px solid #222"
};

const imgStyle = {
  width: "100%",
  height: "400px",
  objectFit: "cover",
  borderRadius: "14px"
};

const heartBtn = {
  position: "absolute",
  top: "15px",
  right: "15px",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  fontSize: "18px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
};

const details = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const conditionBadge = {
  display: "inline-block",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  color: "white",
  fontWeight: "bold",
  marginBottom: "15px"
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: "1px solid #222"
};

const infoLabel = {
  color: "#aaa",
  fontSize: "14px"
};

const infoValue = {
  color: "white",
  fontWeight: "bold",
  fontSize: "14px"
};

const descBox = {
  background: "#111",
  padding: "15px",
  borderRadius: "12px",
  marginTop: "10px"
};

const rentBtn = {
  flex: 1,
  padding: "12px",
  background: "#ff6b35",
  border: "none",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px"
};

const cartBtn = {
  flex: 1,
  padding: "12px",
  background: "#333",
  border: "none",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px"
};

export default ProductDetail;