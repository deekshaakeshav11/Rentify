import React from "react";
import { useNavigate } from "react-router-dom";

function Rent({ rentItems, setRentItems }) {
  const navigate = useNavigate();
  const removeFromRent = (index) => {
    const updated = rentItems.filter((_, i) => i !== index);
    setRentItems(updated);
  };

  const total = rentItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={container}>
      <h2 style={heading}>📦 My Rented Items</h2>

      {rentItems.length === 0 ? (
        <div style={empty}>
          <p style={{ fontSize: "50px" }}>📦</p>
          <p style={{ color: "#aaa", fontSize: "18px" }}>You haven't rented anything yet!</p>
        </div>
      ) : (
        <>
          <div style={grid}>
            {rentItems.map((item, i) => (
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

                  {/* STATUS BADGE */}
                  <span style={statusBadge}>
                    🟢 Active Rental
                  </span>

                  {/* CONDITION BADGE */}
                  <span style={{
                    ...badge,
                    background: item.condition === "Poor" ? "#e74c3c"
                      : item.condition === "Better" ? "#2ecc71"
                      : "#f39c12"
                  }}>
                    {item.condition || "Good"} Condition
                  </span>

                  <button
                    style={returnBtn}
                    onClick={() => removeFromRent(i)}
                  >
                    Return Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          {/* TOTAL */}
<div style={totalBox}>
  <div>
    <p style={{ color: "#aaa", margin: 0 }}>Total Rental Value</p>
    <h3 style={{ margin: "5px 0 0" }}>
      Total: <span style={{ color: "#ff6b35" }}>₹{total}</span>
    </h3>
  </div>
  <div style={{ textAlign: "right" }}>
    <p style={{ color: "#aaa", margin: 0 }}>Items Rented</p>
    <h3 style={{ margin: "5px 0 0", color: "#ff6b35" }}>{rentItems.length}</h3>
  </div>
  <button
  style={checkoutBtn}
  onClick={() => navigate("/payment", { state: { total, type: "rent" } })}
>
  Proceed to Payment
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
  marginBottom: "10px",
  marginLeft: "5px"
};

const statusBadge = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  color: "white",
  fontWeight: "bold",
  marginBottom: "10px",
  background: "#2ecc71"
};

const returnBtn = {
  width: "100%",
  padding: "8px",
  background: "#ff6b35",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "5px"
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

export default Rent;