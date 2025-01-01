function calculateLoan(user) {
  // Calculate the repayment period for the requested loan amount
  const repay = calculateRepayment(user.loanamt, user.salary, user); // Formula: repay = min(max(ceil(amount / (salary * 0.3)), 6), riskScore > 70 ? 24 : 12)

  // Compute various financial factors influencing creditworthiness
  const factors = CreditFactors(user, user.loanamt, repay);

  // Check eligibility by age
  const isAgeEligible = user.age >= 21 && user.age <= 60;

  // Calculate the base credit score
  const baseScore = BaseScore(factors); // Formula: baseScore = 200 * (1 + salaryGrowth) + 200 * (1 - debtToIncome) + 200 * (1 - spending) + 200 * savings + 200 * timeScore

  // Calculate the risk score
  const riskScore = RiskScore(factors); // Formula: riskScore = max(0, 100 - (number of risky factors) * 25)

  // Check eligibility based on base score
  const isEligible = baseScore >= 600 && isAgeEligible;;

  // Determine the maximum loan multiple based on the base score
  const maxLoanMultiple = MaxLoanAmount(baseScore); // Formula: maxLoanMultiple = 12 (score >= 800), 10 (700–799), 8 (600–699), 0 (<600)

  // Calculate the approved loan amount
  const approvedAmount = Math.min(user.salary * maxLoanMultiple, user.loanamt); // Formula: approvedAmount = min(salary * maxLoanMultiple, requested loan amount)

  // Calculate the recommended time period for the approved loan amount
  const recommendedPeriod = calculateRepayment(approvedAmount, user.salary, factors); // Formula: same as repay calculation

  // Calculate the recommended EMI for the approved loan amount
  const recommendedEMI = calculateEMI(approvedAmount, recommendedPeriod, 0.12); // Formula: EMI = (P * r * (1 + r)^n) / ((1 + r)^n - 1)

  // Determine the loan application status
  let status = "PENDING";
  if (!isEligible) {
    status = "REJECTED";
  } else if (approvedAmount > 0) {
    status = "APPROVED";
  }

  // Return the loan details
  return {
    status,
    isEligible,
    approvedAmount: isEligible ? approvedAmount : 0,
    recommendedEMI,
    recommendedPeriod,
    riskScore,
  };
}

function CreditFactors(user, requestedAmt, requestedTime) {
  // Calculate salary growth
  const salaryGrowth = (user.salary - user.presalary) / user.presalary; // Formula: salaryGrowth = (currentSalary - previousSalary) / previousSalary

  // Calculate the monthly EMI for the requested loan
  const monthlyEMI = calculateEMI(requestedAmt, requestedTime, 0.12); // Formula: EMI = (P * r * (1 + r)^n) / ((1 + r)^n - 1)

  // Calculate total monthly debt
  const totalMonthlyDebt = user.emi + monthlyEMI; // Formula: totalMonthlyDebt = existingEMI + requestedLoanEMI

  // Calculate the debt-to-income ratio
  const debtToIncome = totalMonthlyDebt / user.salary; // Formula: debtToIncome = totalMonthlyDebt / salary

  // Calculate spending ratio
  const spending = (user.house ? 0 : user.rent || 0) / user.salary; // Formula: spending = rent / salary (if renting, 0 if owning)

  // Calculate savings ratio
  const totalExpenses = user.expense + user.emi + (user.house ? 0 : user.rent || 0); // Formula: totalExpenses = expenses + EMI + (rent or 0)
  const savings = (user.salary - totalExpenses) / user.salary; // Formula: savings = (salary - totalExpenses) / salary

  // Calculate time score
  const idealTime = Math.ceil(requestedAmt / (user.salary * 0.3)); // Formula: idealTime = ceil(requestedAmt / (salary * 0.3))
  const timeScore = 1 - Math.abs(requestedTime - idealTime) / idealTime; // Formula: timeScore = 1 - abs(requestedTime - idealTime) / idealTime

  return {
    salaryGrowth,
    debtToIncome,
    spending,
    savings,
    timeScore,
  };
}

function BaseScore(factors) {
  // Calculate the base score based on weighted credit factors
  return (
    200 * (1 + factors.salaryGrowth) + // 20% weight for salary growth
    200 * (1 - factors.debtToIncome) + // 20% weight for lower debt-to-income ratio
    200 * (1 - factors.spending) + // 20% weight for lower spending ratio
    200 * factors.savings + // 20% weight for higher savings ratio
    200 * factors.timeScore // 20% weight for alignment with ideal repayment time
  );
}

function RiskScore(factors) {
  // Evaluate risk score based on the number of risky factors
  const riskFactors = [
    factors.debtToIncome > 0.5, // Risk: Debt-to-income ratio > 50%
    factors.spending > 0.4, // Risk: Spending > 40% of salary
    factors.savings < 0.2, // Risk: Savings < 20% of salary
    factors.salaryGrowth < 0.1, // Risk: Salary growth < 10%
  ];

  // Calculate risk score
  const riskCount = riskFactors.filter(Boolean).length; // Count number of risky factors
  return Math.max(0, 100 - riskCount * 25); // Formula: riskScore = max(0, 100 - (riskCount * 25))
}

function MaxLoanAmount(baseScore) {
  // Determine maximum loan multiplier based on base score
  if (baseScore >= 800) return 12; // 12x salary for baseScore >= 800
  if (baseScore >= 700) return 10; // 10x salary for baseScore 700–799
  if (baseScore >= 600) return 8; // 8x salary for baseScore 600–699
  return 0; // Not eligible for baseScore < 600
}

function calculateRepayment(amount, salary, factors) {
  // Calculate repayment period
  const baseMonths = Math.ceil(amount / (salary * 0.3)); // Formula: baseMonths = ceil(amount / (salary * 0.3))
  return Math.min(Math.max(baseMonths, 6), factors.riskScore > 70 ? 24 : 12); // Month between 6 and (12 or 24 months based on risk)
}

function calculateEMI(principal, time, annualInterestRate) {
  // Calculate EMI for the loan amount
  const monthlyRate = annualInterestRate / 12; // Monthly interest rate = annual rate / 12
  return Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) / 
    (Math.pow(1 + monthlyRate, time) - 1) // Formula: EMI = (P * r * (1 + r)^n) / ((1 + r)^n - 1)
  );
}

module.exports = { calculateLoan };