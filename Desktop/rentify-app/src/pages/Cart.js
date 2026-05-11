import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const removeFromCart = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={container}>
      <h2 style={heading}>🛒 My Cart</h2>

      {cart.length === 0 ? (
        <div style={empty}>
          <p style={{ fontSize: "50px" }}>🛒</p>
          <p style={{ color: "#aaa", fontSize: "18px" }}>Your cart is empty!</p>
        </div>
      ) : (
        <>
          <div style={grid}>
            {cart.map((item, i) => (
              <div key={i} style={card}>
                <img
                  src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
                  alt={item.name}
                  style={img}
                />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ margin: "0 0 5px" }}>{item.name}</h3>
                  <p style={{ color: "#ff6b35", fontWeight: "bold", margin: "0 0 5px" }}>
                    ₹{item.price}
                  </p>
                  <p style={{ color: "#aaa", fontSize: "13px", margin: "0 0 10px" }}>
                    Category: {item.category}
                  </p>
                  {/* CONDITION BADGE */}
                  <span style={{
                    ...badge,
                    background: item.condition === "Poor" ? "#e74c3c"
                      : item.condition === "Good" ? "#f39c12"
                      : "#2ecc71"
                  }}>
                    {item.condition || "Good"} Condition
                  </span>
                  <button
                    style={removeBtn}
                    onClick={() => removeFromCart(i)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div style={totalBox}>
            <h3>Total: <span style={{ color: "#ff6b35" }}>₹{total}</span></h3>
           <button
  style={checkoutBtn}
  onClick={() => navigate("/payment", { state: { total, type: "cart" } })}
>
  Proceed to Checkout
</button>
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
  marginBottom: "30px",
  color: "white"
};

const empty = {
  textAlign: "center",
  marginTop: "100px"
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

const badge = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  color: "white",
  fontWeight: "bold",
  marginBottom: "10px"
};

const removeBtn = {
  width: "100%",
  padding: "8px",
  background: "#e74c3c",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

const totalBox = {
  marginTop: "30px",
  padding: "20px",
  background: "#1a1a1a",
  borderRadius: "14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #333"
};

const checkoutBtn = {
  padding: "12px 30px",
  background: "#ff6b35",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer"
};

export default Cart;