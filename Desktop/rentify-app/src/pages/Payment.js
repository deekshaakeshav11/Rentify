import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qrCode from "../qr.jpeg";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const total = state?.total || 0;
  const type = state?.type || "cart";
  const [paid, setPaid] = useState(false);

  const handleConfirm = () => {
    setPaid(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div style={container}>
      {!paid ? (
        <div style={card}>
          {/* HEADER */}
          <h2 style={heading}>💳 Complete Your Payment</h2>
          <p style={{ color: "#aaa", marginBottom: "20px", textAlign: "center" }}>
            Scan the QR code below to pay using any UPI app
          </p>

          {/* AMOUNT BOX */}
          <div style={amountBox}>
            <p style={{ color: "#aaa", margin: 0, fontSize: "14px" }}>Total Amount</p>
            <h2 style={{ color: "#ff6b35", margin: "5px 0 0", fontSize: "32px" }}>
              ₹{total}
            </h2>
          </div>

          {/* QR CODE */}
          <div style={qrBox}>
            <img
              src={qrCode}
              alt="Payment QR Code"
              style={qrImg}
            />
          </div>

          {/* UPI ID */}
          <div style={upiBox}>
            <p style={{ color: "#aaa", margin: "0 0 5px", fontSize: "13px" }}>UPI ID</p>
            <p style={{ color: "white", fontWeight: "bold", margin: 0, fontSize: "16px" }}>
              deekshaks156@oksbi
            </p>
          </div>

          <p style={{ color: "#aaa", fontSize: "13px", textAlign: "center", marginTop: "15px" }}>
            📱 Open Google Pay, PhonePe, Paytm or any UPI app and scan
          </p>

          {/* CONFIRM BUTTON */}
          <button style={confirmBtn} onClick={handleConfirm}>
            ✅ I have Completed the Payment
          </button>

          {/* BACK BUTTON */}
          <button style={backBtn} onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>
      ) : (
        // SUCCESS SCREEN
        <div style={successCard}>
          <p style={{ fontSize: "80px", margin: 0 }}>🎉</p>
          <h2 style={{ color: "#2ecc71", margin: "15px 0 10px" }}>Payment Successful!</h2>
          <p style={{ color: "#aaa", fontSize: "16px" }}>
            Thank you for your payment of <span style={{ color: "#ff6b35", fontWeight: "bold" }}>₹{total}</span>
          </p>
          <p style={{ color: "#aaa", fontSize: "14px" }}>
            Redirecting to home page...
          </p>
          <div style={loader}></div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const container = {
  background: "#0b0b0b",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 20px"
};

const card = {
  background: "#1a1a1a",
  borderRadius: "20px",
  padding: "35px",
  width: "100%",
  maxWidth: "420px",
  border: "1px solid #222",
  boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
};

const heading = {
  color: "white",
  textAlign: "center",
  margin: "0 0 10px",
  fontSize: "22px"
};

const amountBox = {
  background: "#111",
  borderRadius: "12px",
  padding: "15px",
  textAlign: "center",
  marginBottom: "20px",
  border: "1px solid #333"
};

const qrBox = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px"
};

const qrImg = {
  width: "220px",
  height: "220px",
  borderRadius: "12px",
  border: "3px solid #ff6b35",
  objectFit: "cover"
};

const upiBox = {
  background: "#111",
  borderRadius: "10px",
  padding: "12px",
  textAlign: "center",
  border: "1px solid #333"
};

const confirmBtn = {
  width: "100%",
  padding: "14px",
  background: "#2ecc71",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  fontSize: "15px",
  cursor: "pointer",
  marginTop: "20px"
};

const backBtn = {
  width: "100%",
  padding: "12px",
  background: "transparent",
  border: "1px solid #333",
  borderRadius: "10px",
  color: "#aaa",
  fontSize: "14px",
  cursor: "pointer",
  marginTop: "10px"
};

const successCard = {
  background: "#1a1a1a",
  borderRadius: "20px",
  padding: "50px 35px",
  width: "100%",
  maxWidth: "420px",
  textAlign: "center",
  border: "1px solid #2ecc71",
  boxShadow: "0 0 40px rgba(46,204,113,0.2)"
};

const loader = {
  width: "40px",
  height: "40px",
  border: "4px solid #333",
  borderTop: "4px solid #ff6b35",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "20px auto 0"
};

export default Payment;