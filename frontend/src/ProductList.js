import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCardMui";
import { useCart } from "./cartContext";
import { Container, Typography, Box, CircularProgress } from "@mui/material";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        component="h2"
        align="left"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        🛍️ Our Top Picks For You
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)", 
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            gap: 3,
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} onAdd={addToCart} />
            ))
          ) : (
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ textAlign: "center", mt: 4, gridColumn: "1/-1" }}
            >
              No products available at the moment.
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
}
