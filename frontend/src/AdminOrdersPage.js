import React, { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to load orders:", err));
  }, []);

  const markAsDelivered = async (id) => {
    await fetch(`http://localhost:4000/api/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Delivered" }),
    });

    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status: "Delivered" } : order
      )
    );
  };

  return (
    <div style={{ padding: 30, background: "#f8fbff", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#222", marginBottom: 20 }}>
        📦 Admin Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            background: "white",
            padding: 20,
            marginBottom: 25,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: 10 }}>
            {order.firstName} {order.lastName}
          </h2>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: order.status === "Pending" ? "#ff4444" : "green",
                fontWeight: "bold",
              }}
            >
              {order.status}
            </span>
          </p>

          <h3 style={{ marginTop: 15, marginBottom: 10 }}>🛒 Ordered Items</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {order.items.map((i) => (
              <li
                key={i._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 15,
                  background: "#f9f9f9",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                {i.product?.image && (
                  <img
                    src={`http://localhost:4000${i.product.image}`}
                    alt={i.product?.name}
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      marginRight: 15,
                      borderRadius: 8,
                      border: "1px solid #ddd",
                    }}
                  />
                )}
                <div>
                  <strong style={{ fontSize: "1rem" }}>
                    {i.product?.name || "Unknown Product"}
                  </strong>
                  <p style={{ margin: "5px 0", color: "#555" }}>
                    ${i.product?.price?.toFixed(2)} × {i.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {order.status === "Pending" && (
            <button
              onClick={() => markAsDelivered(order._id)}
              style={{
                marginTop: 10,
                background: "linear-gradient(90deg, #28a745, #34d058)",
                color: "white",
                padding: "10px 18px",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✅ Mark as Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
