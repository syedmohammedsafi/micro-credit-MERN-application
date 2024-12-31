import { FaRegClock, FaUsers, FaWallet, FaAward } from "react-icons/fa";

const stats = [
  {
    icon: FaUsers,
    value: "10,000+",
    label: "Happy Customers",
  },
  {
    icon: FaWallet,
    value: "₹1 Cr+",
    label: "Loans Disbursed",
  },
  {
    icon: FaRegClock,
    value: "15 mins",
    label: "Average Approval Time",
  },
  {
    icon: FaAward,
    value: "4.8/5",
    label: "Customer Rating",
  },
];

function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-12 py-12 mt-12">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="text-center relative">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-xl font-semibold mb-2">{stat.value}</h1>
            <h1 className="text-indigo-100">{stat.label}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default Stats;