import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [loans, setLoans] = useState([]); // State to store user data

  // Fetching data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin',{
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(response.data.user || []);
        setLoans(response.data.loan || []);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);

  const FindUser = useMemo(
    () => (userId) => {
      const user = users.find((u) => u._id === userId);
      return user ? user.email : 'N/A';
    },
    [users]
  );

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Users Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? 
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">No loan records available</td>
              </tr> : 
              users.map((user) => (
                <tr key={user._id} className="text-center hover:bg-gray-50 transition">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loans Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Loans</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Loan Amount</th>
                <th className="border px-4 py-2">Approved Amount</th>
                <th className="border px-4 py-2">Loan Duration</th>
                <th className="border px-4 py-2">EMI</th>
                <th className="border px-4 py-2">Risk Score</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Interest Amount</th>
              </tr>
            </thead>
            <tbody>
              {loans.length === 0 ?
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">No loan records available</td>
              </tr> :
              loans.map((loan) => (
                <tr key={loan._id} className="text-center hover:bg-gray-50 transition">
                  <td className="border px-4 py-2">{FindUser(loan.userId)}</td>
                  <td className="border px-4 py-2">{loan.requestedAmount}</td>
                  <td className="border px-4 py-2">{loan.approvedAmount}</td>
                  <td className="border px-4 py-2">{loan.repaymentPeriod}</td>
                  <td className="border px-4 py-2">{loan.emi}</td>
                  <td className="border px-4 py-2">{loan.riskScore}</td>
                  <td className={`border px-4 py-2 ${loan.status === 'APPROVED'?'text-green-600':'text-red-600'}`}>{loan.status}</td>
                  <td className="border px-4 py-2">{loan.interest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
