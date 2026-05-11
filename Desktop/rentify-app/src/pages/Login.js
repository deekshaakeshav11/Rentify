import React, { useState, useEffect } from "react";
import API from "../api";

function Login({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setLogoVisible(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        const { data } = await API.post('/auth/register', { name, email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert(`Welcome, ${data.user.name}! Account created successfully!`);
      } else {
        const { data } = await API.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert(`Welcome back, ${data.user.name}!`);
      }
      onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={container}>
      <div style={box}>

        {/* ANIMATED LOGO */}
        <div style={{
          textAlign: "center",
          marginBottom: "10px",
          transform: logoVisible ? "scale(1)" : "scale(0)",
          opacity: logoVisible ? 1 : 0,
          transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}>
          <img
            src={require("../rentify logo.jpeg")}
            alt="Rentify Logo"
            style={{
              height: "90px",
              width: "90px",
              objectFit: "contain",
              borderRadius: "16px",
              boxShadow: "0 0 30px rgba(255,107,53,0.4)"
            }}
          />
        </div>

        {/* ANIMATED TITLE */}
        <div style={{
          textAlign: "center",
          transform: logoVisible ? "translateY(0)" : "translateY(20px)",
          opacity: logoVisible ? 1 : 0,
          transition: "all 0.6s ease 0.3s"
        }}>
          <h2 style={{ color: "#ff6b35", margin: "0 0 5px" }}>Rentify</h2>
          <h3 style={{ margin: "0 0 5px", color: "white" }}>
            {isRegister ? "Create Account" : "Welcome Back"}
          </h3>
          <p style={{ color: "#aaa", margin: "0 0 15px", fontSize: "14px" }}>
            {isRegister ? "Register a new account" : "Please sign in to your account"}
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </p>
        )}

        {/* ANIMATED FORM */}
        <div style={{
          transform: logoVisible ? "translateY(0)" : "translateY(30px)",
          opacity: logoVisible ? 1 : 0,
          transition: "all 0.6s ease 0.5s"
        }}>
         <form onSubmit={handleSubmit} autoComplete="off">
            {isRegister && (
              <input
                type="text"
                placeholder="Full Name"
                style={input}
                value={name}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              style={input}
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              style={input}
              value={password}
              autoComplete="new passowrd"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" style={btn}>
              {isRegister ? "Register" : "Sign In"}
            </button>
          </form>

          <p
            style={{ textAlign: "center", marginTop: "15px", color: "#aaa", cursor: "pointer", fontSize: "14px" }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
          </p>
        </div>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0a0a0a",
};

const box = {
  background: "#1a1a1a",
  padding: "30px",
  borderRadius: "16px",
  width: "370px",
  color: "white",
  border: "1px solid #222",
  boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#141414",
  color: "white",
  outline: "none",
  boxSizing: "border-box"
};

const btn = {
  width: "100%",
  marginTop: "20px",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#ff6b35",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer"
};

export default Login;