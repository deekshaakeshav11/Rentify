<div style={hero}>
  <div style={{ maxWidth: "800px", margin: "auto" }}>

    <h1 style={{ fontSize: "56px", fontWeight: "bold" }}>
      Rent Anything,<br />
      <span style={{ color: "#ff6b35" }}>Anywhere</span>
    </h1>

    <p style={{ color: "#aaa", marginTop: "15px", lineHeight: "1.6" }}>
      Discover great deals on rentals near you. From rooms to vehicles, find what you need at unbeatable prices.
    </p>

    {/* SEARCH BAR */}
    <div style={searchContainer}>
      <input
        placeholder="Search for items..."
        style={searchInput}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select style={dropdown}>
        <option>Location</option>
        <option>Bangalore</option>
        <option>Mangalore</option>
      </select>

      <select style={dropdown}>
        <option>Category</option>
        <option>Rooms</option>
        <option>Vehicles</option>
        <option>Electronics</option>
      </select>

      <button style={searchBtn}>Search</button>
    </div>

  </div>
</div>