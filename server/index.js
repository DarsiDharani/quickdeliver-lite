const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
const path = require("path");
require("dotenv").config();
require("./config/passport"); // 🔥 Must come BEFORE route usage

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Session + Passport middleware (Google OAuth needs this)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/authRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/deliveries", deliveryRoutes);

app.get("/", (req, res) => {
  res.send("QuickDeliver Lite API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚚 Server running on port ${PORT}`));
