require('dotenv').config({ path: '../.env' });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { register, login, auth } = require("./controller/auth");
const { send_otp, verify_otp } = require("./controller/twilio_sms");
const { approveLoan, getLoanDetails } = require("./controller/loan_approval_status");
const { admin } = require("./controller/admin");

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.post("/send-sms", send_otp);
app.post("/verify-otp", verify_otp);
app.post("/apply", auth, approveLoan);
app.get("/loan-status", auth, getLoanDetails);
app.get("/admin", admin);

mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 60000 })
.then(() => { console.log("MongoDB connected")})
.catch((error) => { console.log(error) });

app.listen(process.env.PORT, () => console.log(`Server Running in port ${process.env.PORT}`));