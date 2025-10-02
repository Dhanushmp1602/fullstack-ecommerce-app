import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./ProductList";
import CartPage from "./CartPage";
import AdminOrdersPage from "./AdminOrdersPage";
import { CartProvider, useCart } from "./cartContext";

// ✅ Header with Cart Count + Navigation
function Header() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header
      style={{
        padding: "15px 20px",
        background: "linear-gradient(90deg, #3399ff, #66b3ff)",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <nav style={{ display: "flex", gap: "15px" }}>
        <Link
          to="/"
          style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600 }}
        >
          Home
        </Link>
        <Link
          to="/admin/orders"
          style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600 }}
        >
          Admin Orders
        </Link>
      </nav>

      <Link
        to="/cart"
        style={{
          color: "#fff",
          fontSize: "1.2rem",
          fontWeight: 600,
          background: "#00b348",
          padding: "6px 12px",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "0.3s",
        }}
      >
        Cart ({count})
      </Link>
    </header>
  );
}

export default function App() {
  return (
    <CartProvider>
      {/* ✅ HashRouter ensures routes work on GitHub Pages */}
      <HashRouter>
        <Header />
        <main
          style={{
            padding: "20px",
            background: "linear-gradient(to right, #cce7ff, #e6f2ff)",
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
          </Routes>
        </main>
      </HashRouter>
    </CartProvider>
  );
}
