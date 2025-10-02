const mongoose = require("mongoose");
const Product = require("./product");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  {
    name: "Classic T-Shirt",
    price: 19.99,
    image: "/images/products/tshirt.jpg",
    description: "100% cotton, comfortable everyday wear.",
  },
  {
    name: "Running Shoes",
    price: 59.99,
    image: "/images/products/shoes.jpg",
    description: "Lightweight and durable running shoes.",
  },
  {
    name: "Coffee Mug",
    price: 9.99,
    image: "/images/products/mug.jpg",
    description: "Ceramic mug for your favorite drinks.",
  },
  {
    name: "Denim Jeans",
    price: 39.99,
    image: "/images/products/jeans.jpg",
    description: "Slim fit blue jeans with stretch.",
  },
  {
    name: "Leather Jacket",
    price: 89.99,
    image: "/images/products/jacket.jpg",
    description: "Stylish leather jacket for all seasons.",
  },
  {
    name: "Smart Watch",
    price: 129.99,
    image: "/images/products/smartwatch.jpg",
    description: "Track fitness and stay connected.",
  },
  {
    name: "Backpack",
    price: 49.99,
    image: "/images/products/backpack.jpg",
    description: "Durable backpack for work or travel.",
  },
  {
    name: "Sunglasses",
    price: 14.99,
    image: "/images/products/sunglasses.jpg",
    description: "UV protection stylish sunglasses.",
  },
  {
    name: "Baseball Cap",
    price: 12.99,
    image: "/images/products/cap.jpg",
    description: "Casual cap for everyday wear.",
  },
  {
    name: "Laptop",
    price: 899.99,
    image: "/images/products/laptop.jpg",
    description: "High performance laptop for work and gaming.",
  },
  {
    name: "Smartphone",
    price: 699.99,
    image: "/images/products/phone.jpg",
    description: "Latest smartphone with amazing features.",
  },
  {
    name: "Office Chair",
    price: 149.99,
    image: "/images/products/chair.jpg",
    description: "Ergonomic chair for long working hours.",
  },
  {
    name: "Study Table",
    price: 199.99,
    image: "/images/products/table.jpg",
    description: "Spacious wooden study table.",
  },
  {
    name: "Wireless Headphones",
    price: 79.99,
    image: "/images/products/headphones.jpg",
    description: "Noise cancelling over-ear headphones.",
  },
  {
    name: "Water Bottle",
    price: 15.99,
    image: "/images/products/waterbottle.jpg",
    description: "Stainless steel insulated water bottle.",
  },
];

async function seedProducts() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding products:", err);
    mongoose.connection.close();
  }
}

seedProducts();
