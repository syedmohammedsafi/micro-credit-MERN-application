import React, { useState } from "react";
import { HiDocumentText } from "react-icons/hi2";
import { FaMoneyBillWave } from "react-icons/fa";

function Credit () {
    const [tab, setTab] = useState("eligibility");

    return (
        <div className="rounded-xl mb-8">
        <div className="flex justify-center">
          <button
            className={`flex items-center px-6 py-3 text-lg font-semibold transition ${
              tab === "eligibility"
                ? "rounded-t-xl bg-white text-gray-700 border-t border-r border-l border-gray-300"
                : "shadow-t-md"
            }`}
            onClick={() => setTab("eligibility")}>
            <HiDocumentText className="md:mr-2 s-20" />
            <span className="text-sm">Eligibility & Documentation</span>
          </button>
          <button
            className={`flex items-center px-6 py-3 text-lg font-semibold transition ${
              tab === "rates"
                ? "rounded-t-xl bg-white text-gray-700 border-t border-r border-l border-gray-300"
                : "shadow-t-md"
            }`}
            onClick={() => setTab("rates")}>
            <FaMoneyBillWave className="md:mr-2 s-20" />
            <span className="text-sm">Rates and Charges</span>
          </button>
        </div>

        {tab === "eligibility" && (
          <div className="border border-gray-300 max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
            <div className="bg-gray-200">
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-md p-1">
                <h1 className="text-center text-xl font-bold text-white">Eligibility</h1>
              </div>
              <div className="grid grid-cols-2 gap-4 px-8 py-3">
                <div className="text-gray-600">
                  <h3 className="font-semibold p-1">Customer Segment</h3>
                  <p className="p-1">Women Borrowers</p>
                </div>
                <div className="text-gray-600">
                  <h3 className="font-semibold p-1">Age Criteria</h3>
                  <p className="p-1">20 - 60 years</p>
                </div>
              </div>
            </div>
            <div className="shadow-md">
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-md p-1">
                <h1 className="text-center text-xl font-bold text-white">Loan Requirement</h1>
              </div>
              <div className="border-1 border-gray-900 grid grid-cols-2 gap-4 mb-2 px-8 py-3">
                <div className="text-gray-600">
                  <h3 className="font-semibold p-1">Documents</h3>
                  <ul className="list-disc ml-5 p-1">
                    <li>Aadhar Card / Pan Card</li>
                    <li>Voter ID / Ration Card / MGNREA Card</li>
                  </ul>
                </div>
                <div className="text-gray-600">
                  <h3 className="font-semibold p-1">Income Criteria</h3>
                  <p className="p-1">As per income generating capacity of customer and co-applicant</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "rates" && (
          <div className="border border-gray-300 max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
            <div className="shadow-md text-gray-600">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 grid grid-cols-2 px-6 py-2">
                <h3 className="text-xl font-bold text-left text-white">Charge Type - Micro Loans</h3>
                <p className="text-xl font-bold text-left text-white">Details</p>
              </div>
              <div className="bg-gray-200 grid grid-cols-2 px-6 py-2">
                <h3 className="font-semibold text-left">Interest Rate</h3>
                <p className="text-left">18% to 24% per annum (on reducing balance)*</p>
              </div>
              <div className="grid grid-cols-2 px-6 py-1">
                <h3 className="font-semibold text-left">Processing Fee</h3>
                <p className="text-left">1% on loan Amount + applicable taxes</p>
              </div>
              <div className="bg-gray-200 grid grid-cols-2 px-6 py-2">
                <h3 className="font-semibold text-left">Repayment/EMI Bounce Charges</h3>
                <p className="text-left">Nil</p>
              </div>
              <div className="grid grid-cols-2 px-6 py-1">
                <h3 className="font-semibold text-left">Penalty Charge/Late Payment Charge (LPC)</h3>
                <p className="text-left">Nil</p>
              </div>
              <div className="bg-gray-200 grid grid-cols-2 px-6 py-2">
                <h3 className="font-semibold text-left">Legal/Recovery Charges</h3>
                <p className="text-left">Nil</p>
              </div>
              <div className="grid grid-cols-2 px-6 py-1 mb-3">
                <h3 className="font-semibold text-left">Charges for Documents (e.g., Statement of Account, RepaymentSchedule, Foreclosure Letter)</h3>
                <p className="text-left">Nil</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

export default Credit;