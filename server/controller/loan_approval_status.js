const User = require("../schemas/user");
const Loan = require("../schemas/loan");
const { calculateLoan } = require("./LoanAI");
// const { loan_approval } = require("../controller/twilio_sms");

const approveLoan = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);    // Find the user by ID from the request
    const loanData = req.body;    // Extract loan data from the request body
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    // Update the user object with loan data or retain existing values
    Object.assign(user, {
      name: loanData.name || user.name,
      age: loanData.age || user.age,
      pancard: loanData.pancard || user.pancard,
      houseNumber: loanData.houseNumber || user.houseNumber,
      area: loanData.area || user.area,
      city: loanData.city || user.city,
      state: loanData.state || user.state,
      zipcode: loanData.zipcode || user.zipcode,
      occupation: loanData.occupation || user.occupation,
      salary: loanData.salary || user.salary,
      presalary: loanData.presalary || user.presalary,
      house: loanData.house || user.house,
      rent: loanData.rent || user.rent || 0,
      address: loanData.address || user.address,
      expense: loanData.expense || user.expense,
      emi: loanData.emi || user.emi,
      prehike: loanData.prehike || user.prehike,
      posthike: loanData.posthike || user.posthike,
      bank: loanData.bank || user.bank,
      loanamt: loanData.loanamt || user.loanamt,
      savings: loanData.savings || user.savings,
      maritalStatus: loanData.maritalStatus || user.maritalStatus,
      gender: loanData.gender || user.gender,
      dob: loanData.dob || user.dob,
      loanPurpose: loanData.loanPurpose || user.loanPurpose,
      householdSize: loanData.householdSize || user.householdSize,
      accountType: loanData.accountType || user.accountType,
      accountNumber: loanData.accountNumber || user.accountNumber,
      ifscCode: loanData.ifscCode || user.ifscCode,
    });

    await user.save(); // Save the updated user datas to the database

    const analysis = calculateLoan(user);

    const loan = new Loan({
      userId: user._id,
      requestedAmount: req.body.loanamt,
      approvedAmount: 0,
      status: "PENDING",
      riskScore: analysis.riskScore,
      repaymentPeriod: 0,
      emi: 0,
      interest: 0,
    });

    const savedLoan = await loan.save(); // Save the loan record to the database

    // Simulate loan approval or rejection after a delay of 2 minutes
    setTimeout(async () => {
      if (analysis.isEligible) {
        savedLoan.status = "APPROVED";
        savedLoan.approvedAmount = analysis.approvedAmount;
        savedLoan.repaymentPeriod = analysis.recommendedPeriod;
        savedLoan.emi = analysis.recommendedEMI;
        savedLoan.interest = (analysis.recommendedEMI * analysis.recommendedPeriod) - analysis.approvedAmount;
        // loan_approval(user.number);
      } else {
        savedLoan.status = "REJECTED";
      }
      await savedLoan.save();
    }, 2*60*1000);

    res.status(200).json({ message: "Loan Application submitted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Loan approval failed" });
  }
};

const getLoanDetails = async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.userId });   // Find all loans associated with the user
    if (!loans.length) {
      return res.status(404).json({ error: "No loans found for this user" });
    }
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to retrieve loan status" });
  }
};

module.exports = { approveLoan, getLoanDetails };