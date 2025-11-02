const dotenv = require("dotenv");
// Load env variables before anything else
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not set in environment variables");
  process.exit(1);
}

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const schemeRoutes = require("./routes/schemeRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const eligibilityRoutes = require("./routes/eligibilityRoutes");



// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", authRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/eligibility", eligibilityRoutes);

app.get("/", (req, res) => res.send("Server running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
require("./utils/sendEmail.js");