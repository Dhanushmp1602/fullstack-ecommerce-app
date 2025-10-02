import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export default function ProductCard({ product, onAdd }) {
  // Use backend URL + product.image (already contains /images/products/...)
  const imageSrc = `http://localhost:4000${product.image}`;

  return (
    <Card
      sx={{
        maxWidth: 320,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageSrc}
        alt={product.name}
        sx={{ objectFit: "contain", padding: "10px" }}
      />

      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onAdd(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
