const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();

const allowedOrigins = [
  "https://schoolsmanagementerp.netlify.app",
  process.env.CLIENT_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin not allowed by CORS"));
  },
}));

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const admissionRoutes = require("./routes/admission");
const connectDB = require("./config/db");
app.use("/pages", admissionRoutes);
const feesRoutes = require("./routes/fees");
app.use("/pages", feesRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the home page Guys");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to start server because the database connection failed:", error.message);
    process.exit(1);
  });
