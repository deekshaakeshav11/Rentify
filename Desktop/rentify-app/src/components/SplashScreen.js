import React, { useEffect, useState } from "react";

function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
  const logoTimer = setTimeout(() => setLogoVisible(true), 300);

  const fadeTimer = setTimeout(() => setFadeOut(true), 2000);

  const finishTimer = setTimeout(() => {
    setVisible(false);
    onFinish();
  }, 2800);

  return () => {
    clearTimeout(logoTimer);
    clearTimeout(fadeTimer);
    clearTimeout(finishTimer);
  };
}, [onFinish]);

  if (!visible) return null;

  return (
    <div style={{
      ...splashContainer,
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.8s ease"
    }}>
      {/* LOGO */}
      <div style={{
        transform: logoVisible ? "scale(1)" : "scale(0)",
        opacity: logoVisible ? 1 : 0,
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
      }}>
        <img
          src={require("../rentify logo.jpeg")}
          alt="Rentify"
          style={logoStyle}
        />
      </div>

      {/* TITLE */}
      <div style={{
        transform: logoVisible ? "translateY(0)" : "translateY(30px)",
        opacity: logoVisible ? 1 : 0,
        transition: "all 0.6s ease 0.4s"
      }}>
        <h1 style={title}>Rentify</h1>
        <p style={subtitle}>Rent Anything, Anywhere</p>
      </div>

      {/* LOADING DOTS */}
      <div style={{
        marginTop: "40px",
        opacity: logoVisible ? 1 : 0,
        transition: "opacity 0.5s ease 0.8s"
      }}>
        <div style={dotsContainer}>
          <div style={{ ...dot, animationDelay: "0s" }}></div>
          <div style={{ ...dot, animationDelay: "0.2s" }}></div>
          <div style={{ ...dot, animationDelay: "0.4s" }}></div>
        </div>
      </div>

      {/* DOT ANIMATION */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const splashContainer = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "#0a0a0a",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const logoStyle = {
  width: "150px",
  height: "150px",
  objectFit: "contain",
  borderRadius: "24px",
  boxShadow: "0 0 60px rgba(255,107,53,0.5)"
};

const title = {
  color: "#ff6b35",
  fontSize: "48px",
  fontWeight: "bold",
  textAlign: "center",
  margin: "20px 0 5px",
  letterSpacing: "2px"
};

const subtitle = {
  color: "#aaa",
  fontSize: "18px",
  textAlign: "center",
  margin: 0
};

const dotsContainer = {
  display: "flex",
  gap: "10px",
  justifyContent: "center"
};

const dot = {
  width: "10px",
  height: "10px",
  background: "#ff6b35",
  borderRadius: "50%",
  animation: "bounce 0.8s infinite"
};

export default SplashScreen;
