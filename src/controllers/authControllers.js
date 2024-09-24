import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// Register Controller
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({ username, password: hashPassword, role });
    await newUser.save();

    // Respond with success message
    res.status(201).json({
      message: "User registered successfully",
      user: { username, role },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred during registration",
      error: error.message,
    });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with token
    res.status(200).json({
      message: "Login successful",
      token,
      user: { username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during login", error });
  }
};

export { register, login };
