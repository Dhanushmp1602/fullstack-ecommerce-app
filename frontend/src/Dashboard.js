import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FlipCard = ({ title, description, route }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        perspective: "1000px",
        width: 250,
        height: 200,
        cursor: "pointer",
      }}
      onClick={() => navigate(route)}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          "&:hover": { transform: "rotateY(180deg)" },
        }}
      >
        {/* Front */}
        <Card
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#1976d2",
            color: "white",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </Card>

        {/* Back */}
        <Card
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f5f5f5",
          }}
        >
          <CardContent>
            <Typography variant="body1" align="center">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default function Dashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 4,
        mt: 6,
        flexWrap: "wrap",
      }}
    >
      <FlipCard
        title="🏠 Home"
        description="Browse products and start shopping!"
        route="/"
      />
      <FlipCard
        title="📦 Admin Orders"
        description="Manage and track customer orders"
        route="/admin/orders"
      />
    </Box>
  );
}
