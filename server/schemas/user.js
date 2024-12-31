const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema for user collection
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  age: { type: Number },
  address: { type: String },
  houseNumber: { type: String },
  area: { type: String },
  city: { type: String },
  state: { type: String },  
  zipcode: { type: String },
  pancard: { type: String },
  occupation: { type: String },
  salary: { type: Number },
  presalary: { type: Number },
  house: { type: Boolean },
  rent: { type: Number },
  expense: { type: Number },
  emi: { type: Number },
  prehike: { type: String },
  posthike: { type: String },
  bank: { type: String },
  loanamt: { type: Number },
  savings: { type: Number },
  maritalStatus: { type: String },
  gender: { type: String },
  dob: { type: String },
  loanPurpose: { type: String },
  householdSize: { type: Number },
  accountType: { type: String }, 
  accountNumber: { type: String },
  ifscCode: { type: String },    
  createdAt: { type: Date, default: Date.now }
});


// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("user", userSchema);