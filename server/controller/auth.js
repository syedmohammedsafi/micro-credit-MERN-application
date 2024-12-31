require("dotenv").config();
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
    const verified = jwt.verify(token, "7d7a17419f4e28b41b14f1a445c8e2168b7758b7c6a97b0bc8d4f7c0d7a4c05a");
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

    const newuser = email === "safi22052004@gmail.com" ? Admin({ email, password }) : User({ email, number, password });
    await newuser.save();

    const token = jwt.sign({ userId: newuser._id,  role: email === "safi22052004@gmail.com" ? "admin" : "user"  },"7d7a17419f4e28b41b14f1a445c8e2168b7758b7c6a97b0bc8d4f7c0d7a4c05a",{ expiresIn: "7d" });
    res.status(201).json({ message: "user registered successfully", token });
  } catch (error) {
    console.log(error)
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
    const token = jwt.sign({ userId: finduser._id, role: admin ? "admin" : "user" }, "7d7a17419f4e28b41b14f1a445c8e2168b7758b7c6a97b0bc8d4f7c0d7a4c05a",{ expiresIn: "7d" });
    res.status(200).json({ message: "logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { register, login, auth };