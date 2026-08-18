const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();

app.use(cors());

const port = 3000 || PORT;

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
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the home page Guys");
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
