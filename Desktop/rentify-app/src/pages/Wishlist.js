import React from "react";
import { useNavigate } from "react-router-dom";

function Wishlist({ wishlist, setWishlist, cart, setCart, rentItems, setRentItems }) {
  const navigate = useNavigate();

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((w) => w._id !== id));
  };

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    removeFromWishlist(item._id);
  };

  const handleRentNow = (item) => {
    setRentItems([...rentItems, item]);
    removeFromWishlist(item._id);
  };

  return (
    <div style={container}>
      <h2 style={heading}>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div style={emptyBox}>
          <p style={{ fontSize: "80px", margin: 0 }}>💔</p>
          <h2 style={{ color: "#ff6b35", margin: "15px 0 10px" }}>
            Your Wishlist is Empty!
          </h2>
          <p style={{ color: "#aaa", fontSize: "16px", marginBottom: "25px" }}>
            Looks like you haven't added anything yet. Start exploring and add items you love!
          </p>
          <button style={exploreBtn} onClick={() => navigate("/")}>
            🏠 Explore Items
          </button>
        </div>
      ) : (
        <>
          <p style={{ color: "#aaa", marginBottom: "20px" }}>
            {wishlist.length} item{wishlist.length > 1 ? "s" : ""} in your wishlist
          </p>
          <div style={grid}>
            {wishlist.map((item, i) => (
              <div key={i} style={card}>
                <div style={{ position: "relative" }}>
                  <img
                    src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
                    alt={item.name}
                    style={img}
                  />
                  {/* REMOVE FROM WISHLIST */}
                  <button
                    style={heartBtn}
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    ❤️
                  </button>
                </div>

                <div style={{ padding: "12px" }}>
                  <h3 style={{ margin: "0 0 5px" }}>{item.name}</h3>
                  <p style={{ color: "#ff6b35", fontWeight: "bold", margin: "0 0 8px" }}>
                    ₹{item.price}
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

                  <button style={rentBtn} onClick={() => handleRentNow(item)}>
                    📦 Rent Now
                  </button>
                  <button style={cartBtn} onClick={() => handleAddToCart(item)}>
                    🛒 Add to Cart
                  </button>
                  <button style={removeBtn} onClick={() => removeFromWishlist(item._id)}>
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const container = {
  background: "#0b0b0b",
  minHeight: "100vh",
  padding: "40px",
  color: "white"
};

const heading = {
  fontSize: "28px",
  marginBottom: "10px",
  color: "white"
};

const emptyBox = {
  textAlign: "center",
  marginTop: "100px",
  padding: "40px",
  background: "#1a1a1a",
  borderRadius: "20px",
  border: "1px solid #222",
  maxWidth: "500px",
  margin: "100px auto"
};

const exploreBtn = {
  padding: "12px 30px",
  background: "#ff6b35",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "20px"
};

const card = {
  background: "#1a1a1a",
  borderRadius: "14px",
  overflow: "hidden",
  border: "1px solid #222",
  transition: "0.3s"
};

const img = {
  width: "100%",
  height: "180px",
  objectFit: "cover"
};

const heartBtn = {
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  fontSize: "16px",
  cursor: "pointer",
  background: "#ff6b35",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const conditionBadge = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  color: "white",
  fontWeight: "bold",
  marginBottom: "10px"
};

const rentBtn = {
  width: "100%",
  padding: "8px",
  background: "#ff6b35",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  marginBottom: "6px"
};

const cartBtn = {
  width: "100%",
  padding: "8px",
  background: "#333",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  marginBottom: "6px"
};

const removeBtn = {
  width: "100%",
  padding: "8px",
  background: "transparent",
  border: "1px solid #e74c3c",
  borderRadius: "8px",
  color: "#e74c3c",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Wishlist;