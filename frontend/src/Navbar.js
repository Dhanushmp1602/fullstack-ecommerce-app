import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            gap: 1.5,
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 30 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
              cursor: "pointer",
            }}
          >
            ShopSphere
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
