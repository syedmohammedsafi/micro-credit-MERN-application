const mongoose = require('mongoose');

// Schema for loan collection
const LoanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requestedAmount: { type: Number, required: true },
    approvedAmount: { type: Number },
    status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
    riskScore: { type: Number, required: true },
    repaymentPeriod: { type: Number, required: true },
    emi: { type: Number, required: true },
    interest: {type: Number, required: true}
  },
  { timestamps: true }
);

// Post-save hook that gets triggered after a document is saved
LoanSchema.post('save', function (doc, next) {
  next();
});

module.exports = mongoose.model('Loan', LoanSchema);