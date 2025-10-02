import React, { useState } from "react";
import { useCart } from "./cartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clear } = useCart();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [lastTotal, setLastTotal] = useState(null);

  const placeOrder = async () => {
    if (!firstName || !lastName || !address) {
      toast.error("⚠️ All fields are required!");
      return;
    }

    const orderItems = items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    }));

    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          address,
          items: orderItems,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setLastTotal(total);
        toast.success("✅ Order placed successfully!");
        clear();
      } else {
        toast.error(data.error || "❌ Order failed");
      }
    } catch (err) {
      toast.error("❌ Server error. Please try again.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      {items.length === 0 && <p>No items in cart.</p>}

      {items.map((i) => (
        <div
          key={i.id}
          style={{
            marginBottom: 15,
            padding: 10,
            border: "1px solid #ddd",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f9f9f9",
          }}
        >
          <div style={{ flex: 1 }}>
            <strong>{i.name}</strong>
            <p style={{ margin: 0 }}>${i.price.toFixed(2)} each</p>
          </div>

          <input
            type="number"
            value={i.quantity}
            min="1"
            onChange={(e) => updateQuantity(i.id, Number(e.target.value))}
            style={{ width: 60, marginRight: 10 }}
          />

          <p style={{ margin: "0 10px" }}>
            ${(i.price * i.quantity).toFixed(2)}
          </p>

          <button onClick={() => removeItem(i.id)}>Remove</button>
        </div>
      ))}

      <h3>
        Total: ${items.length > 0 ? total.toFixed(2) : lastTotal?.toFixed(2) || 0}
      </h3>

      <h2>Shipping Details</h2>
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={{ marginBottom: 10, display: "block" }}
      />
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        style={{ marginBottom: 10, display: "block" }}
      />
      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          marginBottom: 10,
          display: "block",
          width: "100%",
          height: 60,
        }}
      />
      <button onClick={placeOrder}>Place Order</button>

      {/* ✅ Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
