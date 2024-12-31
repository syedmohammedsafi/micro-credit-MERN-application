import React, { useState } from "react";

const faqs = [
  {
    question: "How long does it take to get approved?",
    answer: "Most applications are processed within 24 hours.",
  },
  {
    question: "What documents do I need to apply?",
    answer:
      "You’ll need proof of income, identification, and a bank statement.",
  },
  {
    question: "Is there a minimum salary requirement?",
    answer:
      "Yes, the minimum salary required is ₹15,000 per month to apply for a micro-loan.",
  },
  {
    question: "What is the maximum loan amount I can apply for?",
    answer: "You can apply for up to ₹5,00,000 depending on your eligibility.",
  },
  {
    question: "Can I prepay my loan?",
    answer: "Yes, prepayment is allowed. Terms and conditions may apply.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, we maintain transparency. All fees are disclosed upfront.",
  },
  {
    question: "How can I track my loan application?",
    answer:
      "You can track your application status on our portal after logging in.",
  },
  {
    question: "What happens if I miss an EMI payment?",
    answer:
      "Late payments may attract penalties. Please contact support for assistance.",
  },
  {
    question: "Can I apply for a joint loan?",
    answer: "Currently, we only offer individual micro-loans.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  };

  return (
    <div className="rounded-lg p-6 my-8 w-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <button
              className="text-lg font-semibold text-indigo-600 w-full text-left flex justify-between items-center transition"
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
              <span className="text-gray-500">{openIndex === index ? "−" : "+"}</span>
            </button>
            <p
              className={`text-gray-600 mt-2 transition-all ${openIndex === index ? "block" : "hidden"}`} // Show or hide based on state
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;