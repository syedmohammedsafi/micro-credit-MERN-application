require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { register, login, auth } = require("./controller/auth");
const { send_otp, verify_otp } = require("./controller/twilio_sms");
const { approveLoan, getLoanDetails } = require("./controller/loan_approval_status");
const { admin } = require("./controller/admin");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.post("/send-sms", send_otp);
app.post("/verify-otp", verify_otp);
app.post("/apply", auth, approveLoan);
app.get("/loan-status", auth, getLoanDetails);
app.get("/admin", admin);

const uri = "mongodb+srv://21cs111:21cs111@cluster.sjhbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

mongoose.connect(uri, { serverSelectionTimeoutMS: 60000 })
.then(() => { console.log("MongoDB connected")})
.catch((error) => { console.log(error) });

app.listen(5000, () => console.log("Server Running in port 5000"));