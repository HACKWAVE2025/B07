const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const schemeRoutes = require("./routes/schemeRoutes");
const reminderRoutes = require("./routes/reminderRoutes");


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

// Routes
app.use("/api/users", authRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/reminders", reminderRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
require("./utils/sendEmail.js");