const twilio = require("twilio");

const accountSid = "AC85c774794f67fc574ce2541afba03328";
const authToken = "e681f62508354e3748d9535865c7ea57";
const client = twilio(accountSid, authToken);

const otpStore = new Map();  // In-memory store for OTPs

// Send OTP
const send_otp = (req, res) => {
  const { mobile } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();   // Generate a 6-digit OTP
  otpStore.set(mobile, { otp, expiry: Date.now() + 2 * 60 * 1000 });    // Store the OTP and its expiry (2 minutes)
  
  // Use Twilio client to send the OTP via SMS
  client.messages.create({
      body: `Your OTP is ${otp}`,
      to: `+91${mobile}`,
      from: "+12184966834",
    })
    .then(() => res.status(200).json({ success: true, message: "OTP sent successfully" }))
    .catch((error) => res.status(500).json({ success: false, message: error.message }));
};

// Verify OTP
const verify_otp = (req, res) => {
  const { mobile, otp } = req.body;

  if (!otpStore.has(mobile)) {
    return res.status(400).json({ success: false, message: "OTP not sent or expired" });
  }

  const storedOtp = otpStore.get(mobile);

  if (storedOtp.otp === otp && Date.now() < storedOtp.expiry) {
    otpStore.delete(mobile);
    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } else {
    otpStore.delete(mobile);
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
};

// Loan Approval Notification
const loan_approval = async (number) => {
  try {
    if (!number) {
      throw new Error("Mobile number is missing");
    }
    await client.messages.create({
      body: "Your loan has been approved",
      to: `+91${number}`,
      from: "+12184966834",
    });
  } catch (error) {
    console.error("Error sending loan approval message:", error);
  }
};

module.exports = { send_otp, verify_otp, loan_approval };