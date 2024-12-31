import {
  FaShieldAlt,
  FaRegClock,
  FaCalculator,
  FaMobileAlt,
  FaChartPie,
  FaUsers,
} from "react-icons/fa";

const features = [
  {
    icon: FaShieldAlt,
    title: "Secure Process",
    description:
      "Your data is protected with bank-grade security and encryption",
  },
  {
    icon: FaRegClock,
    title: "Quick Approval",
    description: "Get instant decisions with our AI-powered assessment system",
  },
  {
    icon: FaCalculator,
    title: "Flexible Terms",
    description:
      "Customized loan amounts and repayment periods to suit your needs",
  },
  {
    icon: FaMobileAlt,
    title: "Easy Application",
    description:
      "Apply for loans anywhere, anytime through our digital platform",
  },
  {
    icon: FaChartPie,
    title: "Smart Analytics",
    description:
      "Advanced algorithms ensure fair and accurate loan assessments",
  },
  {
    icon: FaUsers,
    title: "Customer Support",
    description: "24/7 dedicated support team to assist you with queries",
  },
];

function Features() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">The Smart Choice: MicroCredit</h1>
        <h1 className="text-lg text-gray-600 max-w-2xl mx-auto">we combine cutting-edge technology with customer-centric services toprovide you the best loan experience</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-12 mt-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-row">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-xl font-semibold px-4 my-2">{feature.title}</h1>
              </div>
              <h1 className="text-gray-600">{feature.description}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Features;
