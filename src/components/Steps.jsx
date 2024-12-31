import {
  FaUserPlus,
  FaClipboardCheck,
  FaCheckCircle,
  FaCreditCard,
} from "react-icons/fa";

const steps = [
  {
    icon: FaUserPlus,
    title: "Create Account",
    description: "Sign up with your email and mobile number",
  },
  {
    icon: FaClipboardCheck,
    title: "Fill Details",
    description: "Provide necessary information for loan assessment",
  },
  {
    icon: FaCheckCircle,
    title: "Get Approved",
    description: "Instant approval with AI-powered decision making",
  },
  {
    icon: FaCreditCard,
    title: "Receive Funds",
    description: "Quick payment to your bank account",
  },
];

function Steps() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h1>
        <h1 className="text-lg text-gray-600 max-w-2xl mx-auto">Get your loan in four simple steps</h1>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-4 gap-10 md:gap-8 px-12 mt-4 justify-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="text-center relative">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="h-8 w-8 text-indigo-600" />
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-indigo-100" />
              )}
              <h1 className="text-sm md:text-xl font-semibold mb-2">{step.title}</h1>
              <h1 className="text-xs md:text-base text-gray-600">{step.description}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Steps;
