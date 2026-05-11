import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Home({ cart, setCart, rentItems, setRentItems, wishlist, setWishlist }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await API.get('/items');
        setProducts(data);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };
    fetchItems();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

 const handleAddToCart = (item) => {
  if (cart.length >= 5) {
    showToast("⚠️ Cart is full! Maximum 5 items allowed.");
    return;
  }
  setCart([...cart, item]);
  showToast(`🛒 "${item.name}" added to cart!`);
};

 const handleRentNow = (item) => {
  if (rentItems.length >= 5) {
    showToast("⚠️ Rent list is full! Maximum 5 items allowed.");
    return;
  }
  setRentItems([...rentItems, item]);
  showToast(`📦 "${item.name}" added to rentals!`);
};

 const handleWishlist = (item) => {
  const isWishlisted = wishlist.some((w) => w._id === item._id);
  if (isWishlisted) {
    setWishlist(wishlist.filter((w) => w._id !== item._id));
    showToast(`💔 "${item.name}" removed from wishlist!`);
  } else {
    if (wishlist.length >= 5) {
      showToast("⚠️ Wishlist is full! Maximum 5 items allowed.");
      return;
    }
    setWishlist([...wishlist, item]);
    showToast(`❤️ "${item.name}" added to wishlist!`);
  }
};

  const filtered = searchTriggered
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedCategory === "" || p.category === selectedCategory)
      )
    : products.filter((p) =>
        selectedCategory === "" || p.category === selectedCategory
      );

 const categories = ["Rooms", "Vehicles", "Clothes", "Books", "Machines", "Electronics", "Events", "Entertainment", "Travel"];

const icons = {
  Rooms: "🏠",
  Vehicles: "🚗",
  Clothes: "👕",
  Books: "📚",
  Machines: "⚙️",
  Electronics: "💻",
  Events: "🎉",
  Entertainment: "🎮",
  Travel: "🧳"
};
  

  return (
    <div style={{ background: "#0b0b0b", color: "white", minHeight: "100vh" }}>

      {/* TOAST */}
      {toast && <div style={toastStyle}>{toast}</div>}

      {/* HERO */}
     {/* HERO */}
<div style={hero}>
  {/* BACKGROUND VIDEO */}
  <video
    autoPlay
    muted
    loop
    playsInline
    style={videoBg}
  >
    <source
      src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
      type="video/mp4"
    />
  </video>

  {/* DARK OVERLAY */}
  <div style={overlay}></div>

  {/* CONTENT */}
  <div style={heroContent}>
    <h1 style={{ fontSize: "48px", margin: 0 }}>
      Rent Anything,<br />
      <span style={{ color: "#ff6b35" }}>Anywhere</span>
    </h1>
    <p style={{ color: "#aaa", marginTop: "10px" }}>
      Discover great deals on rentals near you
    </p>
    <div style={searchBox}>
      <input
        placeholder="Search for items..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSearchTriggered(false);
        }}
        style={searchInput}
      />
      <button style={searchBtn} onClick={() => setSearchTriggered(true)}>
        Search
      </button>
    </div>
  </div>
</div>

      {/* CATEGORY */}
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Browse by Category
      </h2>

      <div style={categoryGrid}>
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
            style={{
              ...categoryCard,
              transform: selectedCategory === cat ? "translateY(-10px)" : "translateY(0)",
              border: selectedCategory === cat ? "1px solid #ff6b35" : "1px solid #222",
              boxShadow: selectedCategory === cat ? "0 0 35px rgba(255,107,53,0.5)" : "none"
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== cat) e.currentTarget.style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== cat) e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={iconCircle}>{icons[cat]}</div>
            <h3 style={{ marginTop: "10px" }}>{cat}</h3>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      {searchTriggered && filtered.length === 0 ? (
        <div style={notFound}>
          <p style={{ fontSize: "60px" }}>🔍</p>
          <h2 style={{ color: "#ff6b35" }}>Item Not Found!</h2>
          <p style={{ color: "#aaa", fontSize: "16px" }}>
            Sorry, we couldn't find "<strong>{search}</strong>" in our listings.
          </p>
          <button
            style={{ ...searchBtn, marginTop: "20px" }}
            onClick={() => {
              setSearch("");
              setSearchTriggered(false);
            }}
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div style={grid}>
          {filtered.map((item, i) => {
            const isWishlisted = wishlist.some((w) => w._id === item._id);
            return (
              <div
                key={i}
                style={card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(255,107,53,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* IMAGE + HEART */}
                <div style={{ position: "relative" }}>
                  <img
                    src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
                    alt={item.name}
                    style={img}
                  />
                  {/* HEART BUTTON */}
                  <button
                    style={{
                      ...heartBtn,
                      background: isWishlisted ? "#ff6b35" : "rgba(0,0,0,0.5)",
                    }}
                    onClick={() => handleWishlist(item)}
                  >
                    {isWishlisted ? "❤️" : "🤍"}
                  </button>
                </div>

                <h3 style={{ margin: "10px 0 5px" }}>{item.name}</h3>
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
                  Rent Now
                </button>
                <button style={cartBtn} onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
                <button style={viewBtn} onClick={() => navigate(`/product/${item._id}`, { state: { item } })}>
                  👁️ View Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* STYLES */
const toastStyle = {
  position: "fixed",
  bottom: "30px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#ff6b35",
  color: "white",
  padding: "12px 25px",
  borderRadius: "30px",
  fontWeight: "bold",
  fontSize: "15px",
  zIndex: 9999,
  boxShadow: "0 5px 20px rgba(255,107,53,0.4)"
};

const notFound = {
  textAlign: "center",
  padding: "80px 20px",
  color: "white"
};

const categoryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))",
  gap: "20px",
  padding: "40px",
};

const categoryCard = {
  background: "#111",
  padding: "30px",
  textAlign: "center",
  borderRadius: "16px",
  cursor: "pointer",
  transition: "all 0.25s ease",
  border: "1px solid #222"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: "20px",
  padding: "20px",
};

const card = {
  background: "#1a1a1a",
  padding: "15px",
  borderRadius: "14px",
  transition: "0.3s",
};

const img = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.2s",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
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
  marginTop: "10px",
  width: "100%",
  padding: "10px",
  background: "#ff6b35",
  border: "none",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

const cartBtn = {
  marginTop: "8px",
  width: "100%",
  padding: "10px",
  background: "#333",
  border: "none",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};


const iconCircle = {
  width: "65px",
  height: "65px",
  background: "#ff6b35",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  fontSize: "26px",
  color: "white"
};

const searchInput = {
  flex: 1,
  padding: "12px",
  background: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: "10px",
  color: "white",
  outline: "none",
  width: "300px"
};

const searchBtn = {
  padding: "12px 25px",
  background: "#ff6b35",
  border: "none",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer"
};

const hero = {
  position: "relative",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  overflow: "hidden"
};

const videoBg = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "100%",
  minHeight: "100%",
  width: "auto",
  height: "auto",
  zIndex: 0,
  objectFit: "cover"
};

const overlay = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.65)",
  zIndex: 1
};

const heroContent = {
  position: "relative",
  zIndex: 2,
  padding: "0 40px"
};

const searchBox = {
  marginTop: "20px",
  display: "flex",
  gap: "10px",
  maxWidth: "500px",
};

const viewBtn = {
  marginTop: "8px",
  width: "100%",
  padding: "10px",
  background: "transparent",
  border: "1px solid #ff6b35",
  color: "#ff6b35",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Home;