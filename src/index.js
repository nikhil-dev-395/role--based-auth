import express from "express";
import { config } from "dotenv";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";


// Load environment variables
config();

// Connect to the database
dbConnect();

const app = express();
const port = process.env.PORT || 9090;

// Middleware to parse JSON requests
app.use(express.json());

// routes

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Start the server
const server = () => {
  try {
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  } catch (error) {
    console.error("Error starting server: ", error);
    process.exit(1); // Exit process with failure
  }
};

server();
