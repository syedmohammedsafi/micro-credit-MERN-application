require('dotenv').config({ path: '../../.env' });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const Admin = require("../schemas/admin");

// Middleware: Authentication
const auth = async (req, res, next) => {
  try{
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  }
  catch(error){
    res.status(401).json({error:'Please Authenticate'})
  }
}

// Controller: Register
const register = async (req, res) => {
  const { email, number, password } = req.body;
  try {
    const olduser = await User.findOne({ email });
    if (olduser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const newuser = email === process.env.ADMIN_EMAIL ? Admin({ email, password }) : User({ email, number, password });
    await newuser.save();

    const token = jwt.sign({ userId: newuser._id,  role: email === process.env.ADMIN_EMAIL ? "admin" : "user"  },process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(201).json({ message: "user registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Controller: Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const admin = await Admin.findOne({ email });
    const finduser = user || admin;
    
    if (!finduser) {
      return res.status(404).json({ message: "No user found" });
    }
    // Verify password
    const isMatch = await bcrypt.compare(password, finduser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const token = jwt.sign({ userId: finduser._id, role: admin ? "admin" : "user" }, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(200).json({ message: "logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { register, login, auth };