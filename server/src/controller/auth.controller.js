import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import { hashPassword } from "../libs/hashing.js";
import { GenerateToken, verifyToken } from "../libs/token.js";

// =========================
// LOGIN
// =========================
export const LoginController = async (req, res) => {
  try {
    const email = req.body?.email?.trim().toLowerCase();
    const password = req.body?.password;

    console.log("LOGIN EMAIL:", email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const userData = await User.findOne({ email });

    console.log("USER FOUND:", !!userData);

    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("HASH EXISTS:", !!userData.password);
    console.log("HASH PREFIX:", userData.password?.substring(0, 4));

    const checkPassword = await bcrypt.compare(
      password,
      userData.password
    );

    console.log("PASSWORD MATCH:", checkPassword);

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = await GenerateToken({
      id: userData._id,
      role: userData.role,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 180 * 24 * 60 * 60 * 1000,
    });

    const userResponse = userData.toObject();
    delete userResponse.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: userResponse,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// =========================
// REGISTER
// =========================
export const RegisterController = async (req, res) => {
  try {
    const name = req.body?.name?.trim();
    const email = req.body?.email?.trim().toLowerCase();
    const password = req.body?.password;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const hashPass = await hashPassword(password);

    // Create user
    const result = await User.create({
      name,
      email,
      password: hashPass,
    });

    // Generate JWT
    const token = await GenerateToken({
      id: result._id,
      role: result.role,
    });

    // Cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 180 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// =========================
// CHECK AUTH
// =========================
export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    return res.status(200).json({
      success: true,
      token: decodedToken,
    });
  } catch (error) {
    console.error("Check Auth Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


// =========================
// LOGOUT
// =========================
export const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};