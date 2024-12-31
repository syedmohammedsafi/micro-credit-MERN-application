import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Dashboard() {
  const { token } = useAuth(); // Get the authentication token from context
  if (!token) {
    navigate("/auth/login");
  }
  const [loans, setLoans] = useState([]); // State to hold the list of loans

  // Fetch loan details from the server
  useEffect(() => {
    const FetchLoan = async () => {
      const response = await axios.get("http://localhost:5000/loan-status",{
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(response.data);
    };
    FetchLoan();
  },[token]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 mt-12">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Loan Status</h1>
        {loans.length === 0 ? 
          <p className="text-gray-500 text-lg">No loans available</p>
         : 
          <div className="space-y-6">
            {loans.map((loan, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium text-gray-700">{loan.name}</h2>
                <p className="text-gray-500">Status: <span className="font-semibold text-green-500">{loan.status}</span></p>
                <div className="mt-4">
                  <p className="text-gray-700"><strong>Requested Amount:</strong> ₹{loan.requestedAmount}</p>
                  <p className="text-gray-700"><strong>Approved Amount:</strong> ₹{loan.approvedAmount}</p>
                  <p className="text-gray-700"><strong>Risk Score:</strong> {loan.riskScore}</p>
                  <p className="text-gray-700"><strong>Repayment Period:</strong> {loan.repaymentPeriod} months</p>
                  <p className="text-gray-700"><strong>EMI:</strong> ₹{loan.emi}</p>
                  <p className="text-gray-700"><strong>Interest Amount:</strong> ₹{loan.interest}</p>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default Dashboard;