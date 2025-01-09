const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// middleware

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
const authRouter = require("./router/authRoute.js");
const adminRouter = require("./router/taskroute.js");
const employeeRouter = require("./router/employeRoute.js");
//Auth Routes
app.use("/api/v1/user", authRouter);
// Admin Routes
app.use("/api/v1/admin", adminRouter);
// employee Routes
app.use("/api/v1/employee", employeeRouter);

app.get("/", (req, res) => {
  res.json({ message: "Server is Running" });
});

module.exports = app;
