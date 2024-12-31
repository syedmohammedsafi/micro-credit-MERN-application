const User = require('../schemas/user');
const Loan = require('../schemas/loan');

// Controller: Admin
const admin = async(req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract the payload part of the JWT
    const role = JSON.parse(atob(token.split(".")[1]))?.role;   // Decode the Base64 URL-encoded payload
    if (role === "admin") {
        const user = await User.find();
        const loan = await Loan.find();
        res.json({ user, loan });
    }
}

module.exports = { admin };